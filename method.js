const cards = document.querySelectorAll('.card');
    let touchStartX = null;
    let touchStartY = null;
    cards.forEach(card => {
        card.addEventListener('click', async () => {
            if (touchStartX === null && touchStartY === null) {
                const album = card.getAttribute('data-album');
                console.log(`Fetching songs from album: ${album}`);
                if (album) {
                    try {
                        const songUrls = await fetchSongs(album);
                        console.log(`Songs fetched: ${songUrls}`);
                        displaySongs(songUrls);
                    } catch (error) {
                        console.error(`Error fetching songs for album ${album}:`, error);
                    }
                }
            }
            // Reset touch start coordinates
            touchStartX = null;
            touchStartY = null;
        });

        card.addEventListener('touchstart', (event) => {
            // Store touch start coordinates
            touchStartX = event.touches[0].clientX;
            touchStartY = event.touches[0].clientY;
        });

        card.addEventListener('touchend', () => {
            // Reset touch start coordinates if no significant touch movement occurred
            if (touchStartX !== null && touchStartY !== null) {
                const touchEndX = event.changedTouches[0].clientX;
                const touchEndY = event.changedTouches[0].clientY;
                const dx = Math.abs(touchEndX - touchStartX);
                const dy = Math.abs(touchEndY - touchStartY);
                if (dx < 10 && dy < 10) {
                    touchStartX = null;
                    touchStartY = null;
                }
            }
        });
    });