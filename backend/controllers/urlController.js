const db = require("../config/db");

const generateShortCode = () => {
    return Math.random()
        .toString(36)
        .substring(2, 8);
};

const createShortUrl = (req, res) => {

    const { original_url, user_id } = req.body;

    if (!original_url) {
        return res.status(400).json({
            message: "URL is required"
        });
    }

    const shortCode = generateShortCode();

    const query =
        "INSERT INTO urls (user_id, original_url, short_code) VALUES (?, ?, ?)";

    db.query(
        query,
        [user_id || null, original_url, shortCode],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.status(201).json({
                message: "Short URL Created",
                short_url: `http://localhost:5000/${shortCode}`
            });
        }
    );
};

const redirectUrl = (req, res) => {

    const { shortCode } = req.params;

    const query =
        "SELECT * FROM urls WHERE short_code = ?";

    db.query(query, [shortCode], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "URL not found"
            });
        }

        const originalUrl = result[0].original_url;

        // Increase clicks
        const updateQuery =
            "UPDATE urls SET clicks = clicks + 1 WHERE short_code = ?";

        db.query(updateQuery, [shortCode]);

        res.redirect(originalUrl);
    });
};

module.exports = {
    createShortUrl,
    redirectUrl
};