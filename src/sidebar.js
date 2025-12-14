import bin from "./bin.png";
import { showProject } from "./to-dos";
import { tasksArr } from "./to-dos";

const projectsSection = document.querySelector(".projects-section");
export let projectsArr = [];

class Project {
  constructor(name) {
    this.name = name;
  }
}

export function addProjectToArray(name) {
  const project = new Project(name);
  projectsArr.push(project);
  displayProjects();
}

function displayProjects() {
  projectsSection.innerHTML = "";
  projectsArr.forEach(project => {
    const projectArea = document.createElement("div");
    const projectItem = document.createElement("button");
    const image = document.createElement("img");

    projectItem.classList.add("projectItem");
    projectArea.classList.add("project-area");
    image.classList.add("delete-icon");

    projectItem.textContent = project.name;
    image.src = bin;

    projectItem.addEventListener("click", () => {
      const index = projectsArr.indexOf(project);
      showProject(index)
    });

    image.addEventListener("click", () => {
      projectsSection.removeChild(projectArea);
      const index = projectsArr.indexOf(project);
      projectsArr.splice(index, 1);
    });

    projectsSection.appendChild(projectArea)
    projectArea.appendChild(projectItem);
    projectArea.appendChild(image);
  });
}

addProjectToArray("Default");
addProjectToArray("Default Project");