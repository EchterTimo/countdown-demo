document.addEventListener("DOMContentLoaded", () => {
    const nameLabel = document.getElementById("name");
    const dateLabel = document.getElementById("date");
    const remainingLabel = document.getElementById("remaining");

    const params = new URLSearchParams(window.location.search);
    const name = params.get("name") || "?";
    const timestamp = parseInt(params.get("timestamp")) * 1000 || 0;

    nameLabel.textContent = name;
    dateLabel.textContent = new Date(timestamp).toLocaleString();
    remainingLabel.textContent = "Calculating remaining time...";

    function updateCountdown() {
        const now = Date.now();
        const timeDiff = timestamp - now;

        if (timeDiff <= 0) {
            remainingLabel.textContent = "Time's up!";
            return;
        }

        const seconds = Math.floor((timeDiff / 1000) % 60);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        remainingLabel.textContent =
            days > 0 ? `${days}d ${hours}h ${minutes}m ${seconds}s` :
            hours > 0 ? `${hours}h ${minutes}m ${seconds}s` :
            minutes > 0 ? `${minutes}m ${seconds}s` :
            `${seconds}s`;
    }

    updateCountdown(); // Initial update
    setInterval(updateCountdown, 1000);
});
