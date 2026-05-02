const aboutTitle = document.getElementById("about-title");
const aboutDesc = document.getElementById("about-desc");
const aboutExperience = document.getElementById("exp");
const aboutClients = document.getElementById("clients");
const aboutImage = document.getElementById("about-img");
const aboutPoints = document.getElementById("about-points");

if (typeof aboutInfo !== "undefined") {
    aboutTitle.innerText = aboutInfo.title;
    aboutDesc.innerText = aboutInfo.description;
    aboutExperience.innerText = aboutInfo.experience;
    aboutClients.innerText = aboutInfo.clients;

    const baseImages = [aboutInfo.image];
    if (typeof portfolioItems !== "undefined") {
        portfolioItems.forEach((item) => {
            if (!baseImages.includes(item.image)) {
                baseImages.push(item.image);
            }
        });
    }

    if (aboutImage) {
        aboutImage.classList.add("rotating-image");
        rotateImageSet(baseImages, (images, currentIndex) => {
            aboutImage.classList.add("is-fading");
            window.setTimeout(() => {
                aboutImage.src = images[currentIndex];
                aboutImage.classList.remove("is-fading");
            }, 180);
        });
    }

    aboutPoints.innerHTML = "";
    aboutInfo.points.forEach((point) => {
        const li = document.createElement("li");
        li.innerText = point;
        aboutPoints.appendChild(li);
    });
}
