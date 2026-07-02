import bin from "./bin.png";
import edit from "./edit.png";
import { projectsArr, addTaskToArr, saveProjects } from "./sidebar";

const tasksSection = document.querySelector(".tasks-section");
const editTaskModal = document.querySelector(".edit-task-modal");
const editTaskSubmit = document.querySelector(".edit-task-submit");
const editTaskCancel = document.querySelector(".edit-task-cancel");
const editTaskError = document.querySelector(".edit-task-error");
const emptyMessage = tasksSection.querySelector(".empty-message")

let currentProjectIndex = 0;
let currentTaskIndex = 0;

export function createTask(projectIndex) {
  tasksSection.querySelectorAll(".task").forEach(task => task.remove());
  currentProjectIndex = projectIndex;
  emptyMessage.style.display = "none";

  if (projectsArr[projectIndex] !== undefined) {
    projectsArr[projectIndex].tasks.forEach((task, taskIndex) => {
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

      editTask.classList.add("edit-task");
      deleteTask.classList.add("delete-task");

      deleteTask.addEventListener("click", () => {
        projectsArr[projectIndex].tasks.splice(taskIndex, 1);
        createTask(projectIndex);
        saveProjects();
      });

      editTask.addEventListener("click", () => {
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

      taskRow.appendChild(imageSection);
      imageSection.appendChild(editTask);
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

  if (name === "" || description === "" || dueDate === "") {
    taskError.textContent = "Please ensure all fields are filled";
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

  if (name === "" || description === "" || dueDate === "") {
    editTaskError.textContent = "Please ensure all fields are filled";
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