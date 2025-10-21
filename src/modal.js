const modal = document.querySelector("dialog");

const para = document.createElement("p");
para.textContent = "hello"
modal.appendChild(para);

const closeButon = document.createElement("button");
closeButon.textContent = "close"
modal.appendChild(closeButon)

export default function() {
  const addProject = document.querySelector(".sidebar-addProject");
  addProject.addEventListener("click", () => {
    modal.showModal()
  });
  closeButon.addEventListener("click", (event) => {
    event.preventDefault();
    modal.close()
  });
}