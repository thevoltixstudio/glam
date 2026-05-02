const nav = document.querySelector(".navbar");
const navLinks = document.getElementById("nav-links");
const menuToggle = document.querySelector(".menu-toggle");

function toggleMenu() {
    if (!navLinks || !menuToggle) {
        return;
    }

    const isOpen = navLinks.classList.toggle("active");
    menuToggle.classList.toggle("is-open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
}

function createWhatsAppLink(message) {
    if (typeof contactInfo === "undefined") {
        return "contact.html";
    }

    return "https://wa.me/" + contactInfo.phone + "?text=" + encodeURIComponent(message || contactInfo.whatsappMessage);
}

function mountGlobalCta() {
    if (typeof contactInfo === "undefined" || document.querySelector(".floating-cta")) {
        return;
    }

    const cta = document.createElement("div");
    cta.className = "floating-cta";
    cta.innerHTML = `
        <a href="contact.html" class="btn">Book Now</a>
    `;

    document.body.appendChild(cta);
}

function mountSiteFooter() {
    if (typeof contactInfo === "undefined") {
        return;
    }

    const footer = document.querySelector("footer");
    if (!footer) {
        return;
    }

    const brandName = contactInfo.brandName || "Glam Salon";
    const logoText = contactInfo.logoText || brandName.charAt(0) || "G";
    const cityState = contactInfo.cityState || "";
    const footerDescription = contactInfo.footerDescription || "";
    const address = contactInfo.address || "";
    const postalCode = contactInfo.postalCode || "";
    const mapUrl = contactInfo.mapUrl || "#";
    const phone = contactInfo.phone || "";
    const weekdayTiming = contactInfo.schedule?.weekdays || contactInfo.timing || "";
    const weekendTiming = contactInfo.schedule?.weekend || "";

    const quickLinks = (contactInfo.quickLinks || [])
        .map((link) => `<a href="${link.href}">${link.label}</a>`)
        .join("");

    footer.classList.add("site-footer");
    footer.innerHTML = `
        <div class="site-footer-grid">
            <div class="site-footer-brand">
                <div class="site-footer-logo" aria-hidden="true">${logoText}</div>
                <div>
                    <h2>${brandName}</h2>
                    <p class="site-footer-location">${cityState}</p>
                </div>
                <p class="site-footer-description">${footerDescription}</p>
            </div>

            <div class="site-footer-column">
                <h3>Quick Links</h3>
                <div class="site-footer-links">${quickLinks}</div>
            </div>

            <div class="site-footer-column">
                <h3>Visit Us</h3>
                <p>${address}</p>
                <p>${cityState} ${postalCode}</p>
                <p>${weekdayTiming}</p>
                <p>${weekendTiming}</p>
            </div>

            <div class="site-footer-column">
                <h3>Inquiry</h3>
                <div class="site-footer-links">
                    <a href="tel:${phone}">Call the salon</a>
                    <a href="${createWhatsAppLink()}">WhatsApp inquiry</a>
                    <a href="${mapUrl}" target="_blank" rel="noopener noreferrer">Open map</a>
                </div>
            </div>
        </div>
        <p class="site-footer-copy">&copy; 2026 ${brandName}. All rights reserved.</p>
    `;
}

function rotateImageSet(items, applyImage, delay = 5000) {
    if (!Array.isArray(items) || !items.length || typeof applyImage !== "function") {
        return null;
    }

    let currentIndex = 0;

    const run = () => {
        applyImage(items, currentIndex);
        currentIndex = (currentIndex + 1) % items.length;
    };

    run();
    return window.setInterval(run, delay);
}

if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu);
}

if (nav) {
    const syncNavState = () => {
        nav.classList.toggle("is-scrolled", window.scrollY > 20);
    };

    syncNavState();
    window.addEventListener("scroll", syncNavState, { passive: true });
}

if (navLinks) {
    navLinks.querySelectorAll("a").forEach((link) => {
        const currentPage = window.location.pathname.split("/").pop() || "index.html";
        if (link.getAttribute("href") === currentPage) {
            link.setAttribute("aria-current", "page");
        }

        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove("active");
                menuToggle?.classList.remove("is-open");
                menuToggle?.setAttribute("aria-expanded", "false");
            }
        });
    });
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && navLinks) {
        navLinks.classList.remove("active");
        menuToggle?.classList.remove("is-open");
        menuToggle?.setAttribute("aria-expanded", "false");
    }
});

window.createWhatsAppLink = createWhatsAppLink;
window.rotateImageSet = rotateImageSet;

mountGlobalCta();
mountSiteFooter();
