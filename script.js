document.addEventListener('DOMContentLoaded', function() {
    const phrases = [
        "I was not aware of this need.",
        // Add all your phrases here, ensuring there are enough for the grid.
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
            this.classList.add('clicked');
            // Mark this cell as clicked in the tracker.
            clickedCells[Math.floor(counter / 5)][counter % 5] = true;
            checkBingo(clickedCells);
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
        if ([0, 1, 2, 3, 4].every(i => clicked[i][i]) || [0, 1, 2, 3, 4].every(i => clicked[i][4 - i])) {
            bingo = true;
        }

        if (bingo) {
            document.getElementById('bingoMessage').style.display = 'block';
        }
    }

    // Add a div to display the "BINGO" message.
    const bingoMessage = document.createElement('div');
    bingoMessage.id = 'bingoMessage';
    bingoMessage.textContent = 'BINGO!';
    document.body.appendChild(bingoMessage);
});
