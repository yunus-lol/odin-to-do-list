const projectsSection = document.querySelector(".projects-section");
let projectsArr = [];

class Project {
  constructor(name) {
    this.name = name;
  }
}

export function addProjectToArray(name) {
  const project = new Project(name);
  projectsArr.push(project);
  displayProjects()
}

function displayProjects() {
  projectsSection.innerHTML = ""
  projectsArr.forEach(project => {
    const projectItem = document.createElement("button");
    projectItem.classList.add("projectItem")
    projectItem.textContent = project.name;
    projectsSection.appendChild(projectItem);
  })
}

addProjectToArray("Default Project");