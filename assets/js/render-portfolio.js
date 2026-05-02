const gallery = document.getElementById("gallery");
const filterBtns = document.querySelectorAll(".filter-btn");
const popup = document.getElementById("popup");
const popupImg = document.getElementById("popup-img");
let rotationIntervals = [];

function renderPortfolio(filter = "all") {
    gallery.innerHTML = "";
    rotationIntervals.forEach((intervalId) => window.clearInterval(intervalId));
    rotationIntervals = [];

    const filtered = filter === "all"
        ? portfolioItems
        : portfolioItems.filter(item => item.category === filter);

    filtered.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("portfolio-card");

        div.innerHTML = `
            <img class="rotating-image" src="${item.image}" alt="${item.title}">
            <h3>${item.title}</h3>
        `;

        const imageEl = div.querySelector("img");
        const categoryImages = filtered
            .filter((entry) => entry.category === item.category)
            .map((entry) => entry.image);
        const startOffset = item.id % Math.max(categoryImages.length, 1);

        if (categoryImages.length > 1) {
            const intervalId = rotateImageSet(categoryImages, (images, currentIndex) => {
                imageEl.classList.add("is-fading");
                window.setTimeout(() => {
                    imageEl.src = images[(currentIndex + startOffset) % images.length];
                    imageEl.classList.remove("is-fading");
                }, 180);
            });
            rotationIntervals.push(intervalId);
        }

        div.addEventListener("click", () => {
            popup.classList.add("is-open");
            popupImg.src = imageEl.src;
            popupImg.alt = item.title;
        });

        gallery.appendChild(div);
    });
}

// filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        btn.classList.add("active");

        renderPortfolio(btn.dataset.filter);
    });
});

// close popup
function closePopup() {
    popup.classList.remove("is-open");
}

popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        closePopup();
    }
});

// initial render
renderPortfolio();
