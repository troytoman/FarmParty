// Countdown Logic
const countdown = document.getElementById("countdown");
const eventDate = new Date("2024-03-28T06:00:00"); // Set event date here
setInterval(() => {
    const now = new Date();
    const distance = eventDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = `${days} Days`;
    document.getElementById("hours").textContent = `${hours} Hours`;
    document.getElementById("minutes").textContent = `${minutes} Minutes`;
    document.getElementById("seconds").textContent = `${seconds} Seconds`;
}, 1000);

// RSVP Form Logic
const form = document.getElementById("rsvp-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  
  // Make a POST request to the Netlify function
  const response = await fetch("/.netlify/functions/sendEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email })
  });
  
  if (response.ok) {
    console.log("Email sent successfully");
  } else {
    console.log("Failed to send email");
  }
});

