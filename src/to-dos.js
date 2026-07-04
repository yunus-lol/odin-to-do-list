import bin from "./bin.png";
import { projectsArr, addTaskToArr, saveProjects, handleText } from "./sidebar";

const tasksSection = document.querySelector(".tasks-section");
const editTaskModal = document.querySelector(".edit-task-modal");
const editTaskSubmit = document.querySelector(".edit-task-submit");
const editTaskCancel = document.querySelector(".edit-task-cancel");
const editTaskError = document.querySelector(".edit-task-error");
const emptyMessage = tasksSection.querySelector(".empty-message")

let currentProjectIndex = 0;
let currentTaskIndex = 0;
let draggedIndex = null;

export function createTask(projectIndex) {
  tasksSection.querySelectorAll(".task").forEach(task => task.remove());
  currentProjectIndex = projectIndex;
  emptyMessage.style.display = "none";

  if (projectsArr[projectIndex] !== undefined) {
    projectsArr[projectIndex].tasks.forEach((task, taskIndex) => {
      const card = document.createElement("div");
      card.classList.add("task");
      card.draggable = true;

      card.innerHTML = `
        <div class="task-row">
          <h3 class="task-title">${handleText(task.name, 40)}</h3>
        </div>
        <div class="task-row-two">
          <div class="task-dueDate">Due: ${task.dueDate}</div>
          <div class="task-priority">${task.priority}</div>
        </div>
        <div class="task-description">${handleText(task.description, 50)}</div>
      `;

      const priorityElement = card.querySelector(".task-priority");
      if (task.priority === "Low") {
        priorityElement.classList.add("low");
      } else if (task.priority === "Medium") {
        priorityElement.classList.add("medium");
      } else {
        priorityElement.classList.add("high");
      }

      const taskRow = card.querySelector(".task-row");
      const imageSection = document.createElement("div");
      const deleteTask = document.createElement("img");

      deleteTask.src = bin;
      deleteTask.classList.add("delete-task");

      deleteTask.addEventListener("click", (event) => {
        event.stopPropagation();
        projectsArr[projectIndex].tasks.splice(taskIndex, 1);
        createTask(projectIndex);
        saveProjects();
      });

      card.addEventListener("click", () => {
        const name = document.querySelector("#edit-title");
        const description = document.querySelector("#edit-description");
        const dueDate = document.querySelector("#edit-dueDate");
        const priority = document.querySelector("#edit-priority");

        currentTaskIndex = taskIndex;

        name.value = projectsArr[projectIndex].tasks[taskIndex].name;
        description.value = projectsArr[projectIndex].tasks[taskIndex].description;
        dueDate.value = projectsArr[projectIndex].tasks[taskIndex].dueDate;
        priority.value = projectsArr[projectIndex].tasks[taskIndex].priority;

        editTaskModal.showModal();
      });

      card.addEventListener("dragstart", () => draggedIndex = taskIndex);
      card.addEventListener("dragover", (event) => event.preventDefault());
      card.addEventListener("drop", () => {
        const draggedItem = projectsArr[currentProjectIndex].tasks[draggedIndex];
        projectsArr[currentProjectIndex].tasks.splice(draggedIndex, 1);
        projectsArr[currentProjectIndex].tasks.splice(taskIndex, 0, draggedItem);
        saveProjects();
        createTask(currentProjectIndex);
      });

      taskRow.appendChild(imageSection);
      imageSection.appendChild(deleteTask);
      tasksSection.appendChild(card);
    });
  }
}

const addTaskModal = document.querySelector(".add-task-modal");
const submitTask = document.querySelector(".task-submit");
const cancelTask = document.querySelector(".task-cancel");
const taskError = document.querySelector(".task-error");

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

  if (name === "" || description === "" || dueDate === "" || priority === "Priority") {
    taskError.textContent = "Please ensure all fields are filled";
  } else if (dueDate.length !== 10) {
    taskError.textContent = "Please ensure date is in the format DD/MM/YYYY (or MM/DD/YYYY)";
  } else {
    addTaskToArr(name, description, dueDate, priority, currentProjectIndex);
    addTaskModal.close();
    createTask(currentProjectIndex);
    saveProjects();
  }
});

editTaskSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  const name = document.querySelector("#edit-title").value;
  const description = document.querySelector("#edit-description").value;
  const dueDate = document.querySelector("#edit-dueDate").value;
  const priority = document.querySelector("#edit-priority").value;

  if (name === "" || description === "" || dueDate === "" || priority === "Priority") {
    editTaskError.textContent = "Please ensure all fields are filled";
  } else if (dueDate.length !== 10) {
    editTaskError.textContent = "Please ensure date is in the format DD/MM/YYYY (or MM/DD/YYYY)";
  } else {
    let current = projectsArr[currentProjectIndex].tasks[currentTaskIndex];
    current.name = name;
    current.description = description;
    current.dueDate = dueDate;
    current.priority = priority;
    
    editTaskModal.close();
    createTask(currentProjectIndex);
    saveProjects();
  }
});

editTaskCancel.addEventListener("click", (event) => {
  event.preventDefault();
  editTaskError.textContent = "";
  editTaskModal.close();
});