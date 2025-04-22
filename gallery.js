// Gallery Lightbox Functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxDesc = document.getElementById('lightbox-description');
const lightboxYear = document.getElementById('lightbox-year');
let currentIndex = 0;

// Lightbox Controls
function openLightbox(index) {
    currentIndex = index;
    const item = galleryItems[index];
    lightboxImage.src = item.querySelector('img').src;
    lightboxTitle.textContent = item.querySelector('h3').textContent;
    lightboxDesc.textContent = item.dataset.description;
    lightboxYear.textContent = item.dataset.year;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function navigate(direction) {
    currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
    openLightbox(currentIndex);
}

// Event Listeners
galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

document.querySelector('.close-btn').addEventListener('click', closeLightbox);
document.querySelector('.prev').addEventListener('click', () => navigate(-1));
document.querySelector('.next').addEventListener('click', () => navigate(1));

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
        switch(e.key) {
            case 'ArrowLeft':
                navigate(-1);
                break;
            case 'ArrowRight':
                navigate(1);
                break;
            case 'Escape':
                closeLightbox();
                break;
        }
    }
});

// Click Outside to Close
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Swipe Support for Mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (lightbox.style.display === 'flex') {
        if (touchStartX - touchEndX > 50) navigate(1);  // Swipe left
        if (touchEndX - touchStartX > 50) navigate(-1); // Swipe right
    }
});