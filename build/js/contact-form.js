const formEl = document.getElementById("contactForm");
const submitButton = document.getElementById("submitForm");
const resultMessage = document.getElementById("resultMessage");

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const formData = new FormData(formEl);
  const data = Object.fromEntries(formData);
  console.log(data);

  if (Object.values(data).some((value) => !value)) {
    resultMessage.textContent = "Please fill out all fields.";
    return;
  }

  try {
    const baseUrl = "https://backend.getlinked.ai";
    const apiUrl = `${baseUrl}/hackathon/contact-form`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    if (responseData) {
      resultMessage.textContent = `${responseData.first_name} your request has been recived we will get in touch with you soon`;
      console.log(responseData);
    } else {
      resultMessage.textContent = "An error occurred/invalid data";
    }

    setTimeout(() => {
      resultMessage.textContent = "";
    }, 5000);
    formEl.reset();
  } catch (error) {
    console.error("Error:", error);
    resultMessage.textContent = "An error occurred.";
  }
});
