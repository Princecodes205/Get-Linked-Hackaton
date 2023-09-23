const formEl = document.getElementById("registerForm");
const submitButton = document.getElementById("submitForm");
const errorContainer = document.getElementById("errorContainer");
const agreedCheckbox = document.getElementById("privacy_policy");

const fetchCategories = async () => {
  try {
    const baseUrl = "https://backend.getlinked.ai";
    const apiUrl = `${baseUrl}/hackathon/categories-list`;
    const res = await fetch(apiUrl);
    const data = await res.json();
    if (data) {
      return data;
    }
  } catch (error) {
    console.error(error);

    throw error;
  }
};

fetchCategories()
  .then((categoriesData) => {
    const errorContainer = document.getElementById("errorContainer");
    const categorySelect = document.getElementById("category");

    categoriesData.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;
      categorySelect.appendChild(option);
    });
  })
  .catch((error) => {
    console.error("Error fetching categories:", error);
    errorContainer.textContent = "Error Feching the categories";
  });

function resetInputFields() {
  const teamNameInput = document.getElementById("teamName");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const projectTopicInput = document.getElementById("projectTopic");
  const categorySelect = document.getElementById("category");
  const groupSizeSelect = document.getElementById("groupSize");

  teamNameInput.value = "";
  phoneInput.value = "";
  emailInput.value = "";
  projectTopicInput.value = "";
  categorySelect.value = "";
  groupSizeSelect.value = "";
  agreedCheckbox.checked = false;
}

document.addEventListener("DOMContentLoaded", function () {
  const submitFormButton = document.getElementById("submitForm");
  const registerForm = document.getElementById("registerForm");
  const errorContainer = document.getElementById("errorContainer");
  const agreedCheckbox = document.getElementById("privacy_policy");
  const successModal = document.getElementById("successModal");
  const backBtn = document.getElementById("back");

  submitFormButton.addEventListener("click", function () {
    const teamNameInput = document.getElementById("teamName");
    const phoneInput = document.getElementById("phone");
    const emailInput = document.getElementById("email");
    const projectTopicInput = document.getElementById("projectTopic");
    const categorySelect = document.getElementById("category");
    const groupSizeSelect = document.getElementById("groupSize");

    submitFormButton.textContent = "Processing...";

    if (
      teamNameInput.value === "" ||
      phoneInput.value === "" ||
      emailInput.value === "" ||
      projectTopicInput.value === "" ||
      categorySelect.value === "" ||
      groupSizeSelect.value === "" ||
      !agreedCheckbox.checked
    ) {
      errorContainer.textContent = "Error: Please fill in all required fields.";
      return;
    }

    errorContainer.textContent = "";

    const formData = {
      team_name: teamNameInput.value,
      phone_number: phoneInput.value,
      email: emailInput.value,
      project_topic: projectTopicInput.value,
      category: +categorySelect.value,
      group_size: +groupSizeSelect.value,
      privacy_poclicy_accepted: agreedCheckbox.checked,
    };

    const baseUrl = "https://backend.getlinked.ai";
    const apiUrl = `${baseUrl}/hackathon/registration`;

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((data) => {
        if (data.status === 201) {
          successModal.classList.remove("hidden");
          submitFormButton.textContent = "Register Now";
          successModal.classList.add("flex");
          backBtn.addEventListener("click", () => {
            successModal.classList.add("hidden");
            resetInputFields();
          });
        } else if (data.status === 400) {
          submitFormButton.textContent = "Register Now";
          errorContainer.textContent = "Error: Registration failed.";
        }
      })
      .catch((error) => {
        successModal.classList.add("hidden");

        console.error("Fetch Error:", error);
        errorContainer.textContent =
          "Error: An unexpected error occurred while sending the form data. Check internet and try agian";
      });
  });
});
