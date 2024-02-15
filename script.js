document.addEventListener('DOMContentLoaded', function() {
    const phrases = [
        // Your phrases here
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
