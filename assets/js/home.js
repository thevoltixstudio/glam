const homeExperience = document.getElementById("home-experience");
const homeClients = document.getElementById("home-clients");
const homeTiming = document.getElementById("home-timing");
const homeGalleryImages = document.querySelectorAll(".home-portfolio .gallery img");

if (homeExperience && typeof aboutInfo !== "undefined") {
    homeExperience.innerText = aboutInfo.experience;
}

if (homeClients && typeof aboutInfo !== "undefined") {
    homeClients.innerText = aboutInfo.clients;
}

if (homeTiming && typeof contactInfo !== "undefined") {
    homeTiming.innerText = contactInfo.timing;
}

if (homeGalleryImages.length && typeof portfolioItems !== "undefined") {
    const gallerySources = portfolioItems.map((item) => item.image);

    rotateImageSet(gallerySources, (images, currentIndex) => {
        homeGalleryImages.forEach((img, offset) => {
            const nextImage = images[(currentIndex + offset) % images.length];
            img.classList.add("is-fading");
            window.setTimeout(() => {
                img.src = nextImage;
                img.classList.remove("is-fading");
            }, 180);
        });
    });
}
