const db = require("../config/db");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check existing user
        const checkQuery = "SELECT * FROM users WHERE email = ?";

        db.query(checkQuery, [email], async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (result.length > 0) {
                return res.status(400).json({
                    message: "User already exists"
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user
            const insertQuery =
                "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";

            db.query(
                insertQuery,
                [username, email, hashedPassword],
                (err, result) => {

                    if (err) {
                        return res.status(500).json(err);
                    }

                    res.status(201).json({
                        message: "User Registered Successfully"
                    });
                }
            );
        });

    } catch (error) {
        res.status(500).json(error);
    }
};
const jwt = require("jsonwebtoken");

const loginUser = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    const query = "SELECT * FROM users WHERE email = ?";

    db.query(query, [email], async (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const user = result[0];

        // Compare password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Password"
            });
        }

        // Generate token
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            "secretkey",
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            message: "Login Successful",
            token
        });
    });
};

module.exports = {
    registerUser,
    loginUser
};