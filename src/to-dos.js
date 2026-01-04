import { projectsArr } from "./sidebar";
import bin from "./bin.png";
import edit from "./edit.png"

export let tasksArr = [[], [], [], [], []];
let currentProjectIndex = 0;
let currentTaskIndex;

const mainTitle = document.querySelector(".main-title");
const tasksSection = document.querySelector(".tasks-section");

const addTaskBtn = document.createElement("button");
addTaskBtn.textContent = "+";
addTaskBtn.classList.add("add-task");

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
  currentProjectIndex = index;

  mainTitle.textContent = "";
  mainTitle.textContent = projectsArr[index].name;
  mainTitle.appendChild(addTaskBtn);

  createTask(index);
}

const editTaskModal = document.querySelector(".edit-task-modal");
const editTaskSubmit = document.querySelector(".edit-task-submit");
const editTaskCancel = document.querySelector(".edit-task-cancel");
const editTaskError = document.querySelector(".edit-task-error");

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

    const imageSection = document.createElement("div");
    const deleteTask = document.createElement("img");
    const editTask = document.createElement("img");

    editTask.src = edit;
    deleteTask.src = bin;

    editTask.classList.add("edit-task")
    deleteTask.classList.add("delete-task");

    deleteTask.addEventListener("click", () => {
      const taskIndex = tasksArr[index].indexOf(task);
      tasksArr[index].splice(taskIndex, 1);
      createTask(index);
    });

    editTask.addEventListener("click", () => {
      const name = document.querySelector("#edit-title");
      const description = document.querySelector("#edit-description");
      const dueDate = document.querySelector("#edit-dueDate");
      const priority = document.querySelector("#edit-priority");

      const taskIndex = tasksArr[index].indexOf(task);
      currentTaskIndex = taskIndex

      name.value = tasksArr[index][taskIndex].name;
      description.value = tasksArr[index][taskIndex].description;
      dueDate.value = tasksArr[index][taskIndex].dueDate;
      priority.value = tasksArr[index][taskIndex].priority;

      editTaskModal.showModal();
    });

    taskRow.appendChild(imageSection);
    imageSection.appendChild(editTask);
    imageSection.appendChild(deleteTask);
    tasksSection.appendChild(card);
  });
}

const addTaskModal = document.querySelector(".add-task-modal");
const submitTask = document.querySelector(".task-submit");
const cancelTask = document.querySelector(".task-cancel");
const taskError = document.querySelector(".task-error");

addTaskBtn.addEventListener("click", () => {
  addTaskModal.showModal();
});

cancelTask.addEventListener("click", (event) => {
  event.preventDefault();
  taskError.textContent = "";
  addTaskModal.close();
});

submitTask.addEventListener("click", (event) => {
  event.preventDefault();
  taskError.textContent = "";

  const name = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const dueDate = document.querySelector("#dueDate").value;
  const priority = document.querySelector("#priority").value;

  if (name === "" || description === "" || dueDate === "") {
    taskError.textContent = "Please ensure all fields are filled";
  } else {
    addTaskToArr(name, description, formatDueDate, priority, currentProjectIndex);
    addTaskModal.close();
    createTask(currentProjectIndex);
  }
});

editTaskSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  const name = document.querySelector("#edit-title").value;
  const description = document.querySelector("#edit-description").value;
  const dueDate = document.querySelector("#edit-dueDate").value;
  const priority = document.querySelector("#edit-priority").value;

  if (name === "" || description === "" || dueDate === "") {
    editTaskError.textContent = "Please ensure all fields are filled";
  } else {
    tasksArr[currentProjectIndex].splice(currentTaskIndex, 1);
    addTaskToArr(name, description, dueDate, priority, currentProjectIndex);
    editTaskModal.close();
    createTask(currentProjectIndex);
  }
});

editTaskCancel.addEventListener("click", (event) => {
  event.preventDefault();
  editTaskError.textContent = "";
  editTaskModal.close();
});

addTaskToArr("This is a magnificent title", "This is a description that I am filling with empty space", "2067-07-06", "High", 0);
addTaskToArr("This is a glorious title", "hello this is empty space lol", "2026-05-02", "Low", 0);
addTaskToArr("This is once again empty space", "imagine reading this would never be me 💀💀💀", "2026-11-23", "goodbye", 1);