const formEl = document.getElementById("contactForm");
const submitButton = document.getElementById("submitForm");
const resultMessage = document.getElementById("resultMessage");

submitButton.addEventListener("click", async (event) => {
  event.preventDefault(); // Prevent the default form submission

  const formData = new FormData(formEl);
  const data = Object.fromEntries(formData);
  console.log(data);

  // Check if any of the form fields is empty
  if (Object.values(data).some((value) => !value)) {
    resultMessage.textContent = "Please fill out all fields.";
    return; // Exit the function to prevent sending an empty form
  }

  try {
    const baseUrl = "https://backend.getlinked.ai"; // Replace with your actual base URL
    const apiUrl = `${baseUrl}/hackathon/contact-form`;

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();

    // Display a success message or handle errors
    if (responseData) {
      resultMessage.textContent = `${responseData.first_name} your request has been recived we will get in touch with you soon`;
      console.log(responseData);
    } else {
      resultMessage.textContent = "An error occurred/invalid data";
    }

    // Clear the message after a delay (e.g., 5 seconds)
    setTimeout(() => {
      resultMessage.textContent = "";
    }, 5000); // 5000 milliseconds (5 seconds)
  } catch (error) {
    console.error("Error:", error);
    resultMessage.textContent = "An error occurred.";
  }
});
