import { addProjectToArray } from "./sidebar";

const addProject = document.querySelector(".addProject");
const modal = document.querySelector(".addProjectModal");
const error = document.querySelector(".error");

export function generateModalContent() {
  addProject.addEventListener("click", () => {
    modal.showModal();
  });

  const submit = document.querySelector(".modal-submit")
  submit.addEventListener("click", (event) => {
    event.preventDefault();
    error.textContent = "";
    const name = document.querySelector("#name").value;
    if (name === "") {
      error.textContent = "Please ensure the name is filled correctly.";
    } else {
      addProjectToArray(name);
      modal.close();
    }
  });
}