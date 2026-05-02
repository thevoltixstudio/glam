const container = document.getElementById("services-container");
const filterBtns = document.querySelectorAll(".filter-btn");

function renderServices(filter = "all") {
    container.innerHTML = "";

    const filtered = filter === "all"
        ? services
        : services.filter(s => s.category === filter);

    filtered.forEach(service => {
        const div = document.createElement("div");
        div.classList.add("service-card");

        div.innerHTML = `
            <img src="${service.image}" alt="${service.name}">
            <h3>${service.name}</h3>
            <p>${service.desc}</p>
            <strong class="service-price">${service.price}</strong>
            <a href="contact.html" class="btn">Book Now</a>
        `;

        container.appendChild(div);
    });
}

// Filter buttons
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector(".active").classList.remove("active");
        btn.classList.add("active");

        renderServices(btn.dataset.filter);
    });
});

// initial load
renderServices();
