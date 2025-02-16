document.addEventListener("DOMContentLoaded", () => {
    // Select all game boxes (cells)
    const boxes = document.querySelectorAll(".box");
    const resetBtn = document.getElementById("reset-btn");
    const winnerText = document.getElementById("winner-text");

    // Game state variables
    let currentPlayer = "X"; // X starts first
    let gameState = Array(9).fill(null); // Array to store X/O moves
    let gameActive = true; // Tracks if the game is still ongoing

    /**
     * Function to check if a player has won the game
     */
    const checkWinner = () => {
        // All possible winning combinations (row, column, diagonal)
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]            // Diagonals
        ];

        // Check each winning combination
        for (const [a, b, c] of winningCombos) {
            if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
                gameActive = false; // Stop the game
                winnerText.textContent = `Winner: ${gameState[a]}`; // Display winner
                return;
            }
        }

        // If all boxes are filled and no winner, it's a draw
        if (!gameState.includes(null)) {
            winnerText.textContent = "It's a Draw!";
            gameActive = false;
        }
    };

    /**
     * Function to handle a player's move
     */
    boxes.forEach((box, index) => {
        box.addEventListener("click", () => {
            // If box is empty and game is active, allow move
            if (!gameState[index] && gameActive) {
                gameState[index] = currentPlayer; // Store the move
                box.textContent = currentPlayer; // Display X or O in box
                
                checkWinner(); // Check if someone won

                // Switch to the other player
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        });
    });

    /**
     * Function to reset the game
     */
    resetBtn.addEventListener("click", () => {
        gameState.fill(null); // Reset game state
        boxes.forEach(box => box.textContent = ""); // Clear all boxes
        winnerText.textContent = ""; // Clear winner message
        gameActive = true; // Restart game
        currentPlayer = "X"; // X starts again
    });
});
