import bin from "./bin.png";
import { createTask } from "./to-dos.js";

const projectsSection = document.querySelector(".projects-section");
export let projectsArr = [];
let currentProjectIndex = 0;

class Project {
  constructor(title) {
    this.name = title;
    this.tasks = [];
  }
}

class Task {
  constructor(name, description, dueDate, priority) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

// function loadProjects() {
//   const stored = localStorage.getItem("projectsObj");
//   if (stored) {
//     projectsArr = JSON.parse(stored);
//   } else {
//     projectsArr = [];
//   }
// }

// function saveProjects() {
//   localStorage.setItem("projectsObj", JSON.stringify(projectsArr));
// }

export function addProjectToArray(title) {
  const project = new Project(title);
  projectsArr.push(project);
//  saveProjects();
  displayProjects();
}

export function addTaskToArr(name, description, dueDate, priority, index) {
  const task = new Task(name, description, dueDate, priority);
  projectsArr[index].tasks.push(task);
  // saveProjects();
}

const addTaskBtn = document.createElement("button");
addTaskBtn.textContent = "+";
addTaskBtn.classList.add("add-task");
const addTaskModal = document.querySelector(".add-task-modal");

const projectTitle = document.createElement("h3");
projectTitle.classList.add("projectTitle");

addTaskBtn.addEventListener("click", () => addTaskModal.showModal());

export function showProject(index) {
  currentProjectIndex = index;
  const mainTitle = document.querySelector(".main-title");

  projectTitle.textContent = "";
  projectTitle.textContent = projectsArr[currentProjectIndex].name;

  mainTitle.appendChild(projectTitle)
  mainTitle.appendChild(addTaskBtn);
  createTask(index);
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

    const index = projectsArr.indexOf(project);
    projectItem.addEventListener("click", () => {
      showProject(index);
    });

    image.addEventListener("click", () => {
      projectsArr.splice(index, 1);
      // saveProjects();
      displayProjects();
    });

    projectsSection.appendChild(projectArea)
    projectArea.appendChild(projectItem);
    projectArea.appendChild(image);
  });
}

// loadProjects();

if (projectsArr.length === 0) {
  addProjectToArray("Default");
  addProjectToArray("Default Project");
} else {
  displayProjects();
}

addTaskToArr("This is a magnificent title", "This is a description that I am filling with empty space", "2067-07-06", "High", 0);
addTaskToArr("This is a glorious title", "hello this is empty space lol", "2026-05-02", "Low", 0);
addTaskToArr("This is once again empty space", "imagine reading this would never be me 💀💀💀", "2026-11-23", "goodbye", 1);