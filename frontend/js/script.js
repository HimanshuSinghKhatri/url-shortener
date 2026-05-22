const shortenBtn = document.getElementById("shortenBtn");

const result = document.getElementById("result");

shortenBtn.addEventListener("click", async () => {

    const longUrl = document.getElementById("longUrl").value;

    if (!longUrl) {
        alert("Please enter URL");
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/url/shorten",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    original_url: longUrl,
                    user_id: 1
                })
            }
        );

        const data = await response.json();

        result.innerHTML = `
            <p>Short URL:</p>
            <a href="${data.short_url}" target="_blank">
                ${data.short_url}
            </a>
        `;

    } catch (error) {
        console.log(error);
    }

});