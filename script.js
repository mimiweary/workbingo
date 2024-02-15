document.addEventListener('DOMContentLoaded', function() {
    const phrases = [
        "I was not aware of this need.",
        "I still don't understand [INSERT MAJOR COMPONENT]",
        "A question is asked and completely glossed over",
        "Cat admiration takes place",
        "This conversation needs to take place offline",
        "Correct me if I'm wrong....",
        "That's a planned feature we're working on implementing",
        "Someone goes off-cam briefly to hide their reaction/expression",
        "Screensharing accidentally shows something else not intended",
        ".Freespace", // This will be our actual Free Space
        "Unexpected guest appearance in video call",
        "Mute mishaps",
        "Technical difficulties",
        "Back-to-back meetings comment",
        "Someone says 'Let's circle back'",
        "Reference to weather or time",
        "Awkward silence",
        "Internet connectivity issues",
        "Use of corporate buzzwords",
        "Meeting runs over time",
        "Early dismissal from meeting",
        "Someone's background noise",
        "Last-minute agenda changes",
        "Repeated information"
    ];

    // Initialize an empty 5x5 array to track clicked cells.
    const clickedCells = Array(5).fill().map(() => Array(5).fill(false));

    const grid = document.getElementById('bingoGrid');
    let counter = 0; // To iterate through the grid positions
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.classList.add('bingoCell');
        if (i === 12) {
            cell.textContent = 'FREE SPACE';
            cell.classList.add('freeSpace');
            cell.classList.add('clicked'); // Mark the free space as clicked.
            clickedCells[Math.floor(i / 5)][i % 5] = true; // Mark the free space as clicked in the tracker.
        } else {
            let phraseIndex = Math.floor(Math.random() * phrases.length);
            cell.textContent = phrases.splice(phraseIndex, 1);
        }

        // Add click event listener for each cell.
        cell.addEventListener('click', function() {
            if (!this.classList.contains('clicked')) { // Only act if cell wasn't already clicked.
                this.classList.add('clicked');
                // Mark this cell as clicked in the tracker.
                clickedCells[Math.floor(counter / 5)][counter % 5] = true;
                if (checkBingo(clickedCells)) {
                    alert('BINGO!');
                }
            }
        });

        grid.appendChild(cell);
        counter++;
    }

    function checkBingo(clicked) {
        // Check rows, columns, and diagonals for Bingo.
        let bingo = false;

        // Check rows and columns.
        for (let i = 0; i < 5; i++) {
            if (clicked[i].every(val => val) || clicked.map(row => row[i]).every(val => val)) {
                bingo = true;
            }
        }

        // Check diagonals.
        if ([0, 1, 2, 3, 4].every(i => clicked[i][i]) || [0, 1, 2, 3, 4].every(i => clicked[4 - i][i])) {
            bingo = true;
        }

        return bingo;
    }
});
