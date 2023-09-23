const formEl = document.getElementById("registerForm");
const submitButton = document.getElementById("submitForm");
const errorContainer = document.getElementById("errorContainer");
const agreedCheckbox = document.getElementById("privacy_policy");

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();

  const formData = new FormData(formEl);
  const data = Object.fromEntries(formData);

  data.privacy_policy_accepted = agreedCheckbox.checked ? "true" : "false";

  if (Object.values(data).some((value) => !value)) {
    errorContainer.textContent = "Error: Please fill in all required fields.";
    return;
  }

  const baseUrl = "https://backend.getlinked.ai";
  const apiUrl = "https://backend.getlinked.ai/hackathon/registration";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const responseData = await response.json();

    console.log("API Response Data:", responseData);

    errorContainer.textContent = "";
  } catch (error) {
    console.error("Fetch Error:", error);

    errorContainer.textContent =
      "Error: An unexpected error occurred while sending the form data.";
  }
});
