import { addProjectToArray } from "./sidebar";
import { projectsArr } from "./sidebar";

const addProject = document.querySelector(".addProject");
const modal = document.querySelector(".addProjectModal");
const error = document.querySelector(".error");
const decline = document.querySelector(".decline");
const declineButton = document.querySelector(".decline-close")

export function generateModalContent() {
  addProject.addEventListener("click", () => {
    if (projectsArr.length === 5) {
      decline.showModal();
      declineButton.addEventListener("click", () => {
        decline.close()
      });
    } else {
      modal.showModal();
    }
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