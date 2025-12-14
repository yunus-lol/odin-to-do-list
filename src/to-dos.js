import { projectsArr } from "./sidebar";

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

export function addTaskToArr(name, description, dueDate, priority, index) {
  const task = new Task(name, description, dueDate, priority);
  tasksArr[index].push(task)
}

export function showProject(index) {
  mainTitle.textContent = projectsArr[index].name;
  createTask(index)
  console.log(tasksArr[index])
}

function createTask(index) {
  tasksSection.textContent = ""
  tasksArr[index].forEach(task => {
    const card = document.createElement("div");
    card.classList.add("task")
    card.textContent = ""
    card.innerHTML = `
      <div class="task-row">
        <h3 class="task-title">${task.name}</h3>
        <button class="delete-task">Delete</button>
      </div>
      <div class="task-row-two">
        <div class="task-priority">Priority: ${task.priority}</div>
        <div class="task-dueDate">Due: ${task.dueDate}</div>
      </div>
      <div class="task-description">${task.description}</div>
    `;
    tasksSection.appendChild(card)
  })
}

// ${task.name} ${task.description} ${task.dueDate} ${task.priority}

addTaskToArr("This is a magnificent title", "This is a description that I am filling with empty space", "6/7/67", "High", 0)
addTaskToArr("goodbye", "goodbye", "goodbye", "goodbye", 0)
addTaskToArr("goodbye", "goodbye", "goodbye", "goodbye", 1)