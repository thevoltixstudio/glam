const phoneEl = document.getElementById("phone");
const addressEl = document.getElementById("address");
const timingEl = document.getElementById("timing");
const callBtn = document.getElementById("callBtn");
const whatsappBtn = document.getElementById("whatsappBtn");

if (typeof contactInfo !== "undefined") {
    phoneEl.innerText = contactInfo.displayPhone;
    addressEl.innerText = contactInfo.address;
    timingEl.innerText = contactInfo.timing;

    callBtn.href = "tel:" + contactInfo.phone;
    whatsappBtn.href = createWhatsAppLink(contactInfo.whatsappMessage);
}

function sendToWhatsApp() {
    const name = document.getElementById("name").value;
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value;

    const fullMsg = `Name: ${name}
Service: ${service}
Message: ${message}`;

    window.open(createWhatsAppLink(fullMsg), "_blank");
}
