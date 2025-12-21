import { projectsArr } from "./sidebar";
import bin from "./bin.png";

export let tasksArr = [[], [], [], [], []];

const mainTitle = document.querySelector(".main-title");
const tasksSection = document.querySelector(".tasks-section");

class Task {
  constructor(name, description, dueDate, priority) {
    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }
}

function addTaskToArr(name, description, dueDate, priority, index) {
  const task = new Task(name, description, dueDate, priority);
  tasksArr[index].push(task);
}

export function showProject(index) {
  mainTitle.textContent = projectsArr[index].name;

  const addTaskBtn = document.createElement("button");
  addTaskBtn.textContent = "+";
  addTaskBtn.classList.add("add-task");
  mainTitle.appendChild(addTaskBtn);

  addTask(index);
  createTask(index);
}

export function createTask(index) {
  tasksSection.textContent = "";

  tasksArr[index].forEach(task => {
    const card = document.createElement("div");
    card.classList.add("task");

    card.innerHTML = `
      <div class="task-row">
        <h3 class="task-title">${task.name}</h3>
      </div>
      <div class="task-row-two">
        <div class="task-priority">Priority: ${task.priority}</div>
        <div class="task-dueDate">Due: ${task.dueDate}</div>
      </div>
      <div class="task-description">${task.description}</div>
    `;

    const taskRow = card.querySelector(".task-row");
    const deleteTask = document.createElement("img");
    deleteTask.src = bin;
    deleteTask.classList.add("delete-task");

    deleteTask.addEventListener("click", () => {
      const taskIndex = tasksArr[index].indexOf(task);
      tasksArr[index].splice(taskIndex, 1);
      createTask(index);
    });

    taskRow.appendChild(deleteTask);
    tasksSection.appendChild(card);
  });
}

export function addTask(index) {
  const addTaskButton = document.querySelector(".add-task");
  const addTaskModal = document.querySelector(".add-task-modal");
  const submitTask = document.querySelector(".task-submit");
  const cancelTask = document.querySelector(".task-cancel");

  addTaskButton.addEventListener("click", () => {
    addTaskModal.showModal();
  });

  cancelTask.addEventListener("click", (event) => {
    event.preventDefault()
    addTaskModal.close()
  });

  submitTask.addEventListener("click", (event) => {
    event.preventDefault();

    const name = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#dueDate").value;
    const priority = document.querySelector("#priority").value;

    addTaskToArr(name, description, dueDate, priority, index);
    addTaskModal.close();
    createTask(index);
  });
}

addTaskToArr("This is a magnificent title", "This is a description that I am filling with empty space", "6/7/67", "High", 0);
addTaskToArr("goodbye", "goodbye", "goodbye", "goodbye", 0);
addTaskToArr("goodbye", "goodbye", "goodbye", "goodbye", 1);