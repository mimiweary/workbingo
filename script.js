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
        "....? Freespace?", // This will be our actual Free Space
        // Add more phrases as needed to fill the grid
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

    const grid = document.getElementById('bingoGrid');
    const bingoMessage = document.createElement('div');
    bingoMessage.id = 'bingoMessage';
    bingoMessage.textContent = 'BINGO!';
    document.body.appendChild(bingoMessage);

    let selectedCount = new Array(5).fill(0);
    let selectedRows = new Array(5).fill(0);
    let selectedDiag = [0, 0];

    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.classList.add('bingoCell');
        const rowIndex = Math.floor(i / 5);
        const colIndex = i % 5;
        cell.dataset.row = rowIndex;
        cell.dataset.col = colIndex;

        if (i === 12) {
            cell.textContent = 'FREE SPACE';
            cell.classList.add('freeSpace');
            cell.classList.add('selected'); // Free space is automatically selected
            updateSelectedCount(rowIndex, colIndex, selectedRows, selectedCount, selectedDiag);
        } else {
            let phraseIndex = Math.floor(Math.random() * phrases.length);
            cell.textContent = phrases.splice(phraseIndex, 1);
        }

        cell.addEventListener('click', function() {
            if (!this.classList.contains('selected')) {
                this.classList.add('selected');
                updateSelectedCount(parseInt(this.dataset.row), parseInt(this.dataset.col), selectedRows, selectedCount, selectedDiag);
                checkForBingo(selectedRows, selectedCount, selectedDiag);
            }
        });

        grid.appendChild(cell);
    }

    function updateSelectedCount(row, col, selectedRows, selectedCount, selectedDiag) {
        selectedRows[row]++;
        selectedCount[col]++;
        if (row === col) {
            selectedDiag[0]++;
        }
        if (row + col === 4) {
            selectedDiag[1]++;
        }
    }

    function checkForBingo(rows, cols, diag) {
        const hasBingo = rows.includes(5) || cols.includes(5) || diag.includes(5);
        if (hasBingo) {
            document.getElementById('bingoMessage').style.display = 'block';
        }
    }
});
