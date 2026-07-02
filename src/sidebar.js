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

function loadProjects() {
  const stored = localStorage.getItem("projectsObj");
  if (stored) {
    projectsArr = JSON.parse(stored);
  } else {
    projectsArr = [];
  }
}

export function saveProjects() {
  localStorage.setItem("projectsObj", JSON.stringify(projectsArr));
}

export function addProjectToArray(title) {
  const project = new Project(title);
  projectsArr.push(project);
  saveProjects();
  displayProjects();
}

export function addTaskToArr(name, description, dueDate, priority, index) {
  const task = new Task(name, description, dueDate, priority);
  projectsArr[index].tasks.push(task);
  saveProjects();
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
  
  if (projectsArr[currentProjectIndex] === undefined) {
    showError();
    return;
  }

  projectTitle.textContent = projectsArr[currentProjectIndex].name;
  mainTitle.appendChild(projectTitle)
  mainTitle.appendChild(addTaskBtn);
  createTask(index);
}

function displayProjects() {
  projectsSection.innerHTML = "";
  projectsArr.forEach((project, index) => {
    const projectArea = document.createElement("div");
    const projectItem = document.createElement("button");
    const image = document.createElement("img");

    projectItem.classList.add("projectItem");
    projectArea.classList.add("project-area");
    image.classList.add("delete-icon");

    projectItem.textContent = project.name;
    image.src = bin;

    projectItem.addEventListener("click", () => {
      showProject(index);
    });

    image.addEventListener("click", () => {
      projectsArr.splice(index, 1);

      saveProjects();
      displayProjects();

      if (projectsArr.length === 0) {
        showError();
      } else {
        showProject(0)
      }
    });

    projectsSection.appendChild(projectArea)
    projectArea.appendChild(projectItem);
    projectArea.appendChild(image);
  });
}

function showError() {
  const tasksSection = document.querySelector(".tasks-section");
  const emptyMessage = tasksSection.querySelector(".empty-message")
  const mainTitle = document.querySelector(".main-title");

  emptyMessage.style.display = "block";
  mainTitle.textContent = "";

  tasksSection.querySelectorAll(".task").forEach(task => task.remove());
}

loadProjects();

if (projectsArr.length === 0) {
  showError();
} else {
  displayProjects();
}