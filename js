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
        "Freespace", // This will be our actual Free Space
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
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement('div');
        cell.classList.add('bingoCell');
        // Center cell as Free Space
        if (i === 12) {
            cell.textContent = 'FREE SPACE';
            cell.classList.add('freeSpace');
        } else {
            // Ensure unique phrases are assigned randomly
            let phraseIndex = Math.floor(Math.random() * phrases.length);
            cell.textContent = phrases.splice(phraseIndex, 1);
        }
        grid.appendChild(cell);
    }
});
