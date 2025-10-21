export default function() {
  const sidebar = document.querySelector(".sidebar");

  const heading = document.createElement("h1");
  heading.classList.add("sidebar-heading");
  heading.textContent = "TO-DO";

  const home = document.createElement("button");
  home.classList.add("sidebar-home");
  home.textContent = "Home";

  const todo = document.createElement("button");
  todo.classList.add("sidebar-todo");
  todo.textContent = "To do";

  const projects = document.createElement("button");
  projects.classList.add("sidebar-projects");
  projects.textContent = "Projects";

  const addProject = document.createElement("button");
  addProject.classList.add("sidebar-addProject");
  addProject.textContent = "+ Add Project";

  sidebar.appendChild(heading);
  sidebar.appendChild(home);
  sidebar.appendChild(todo);
  sidebar.appendChild(projects);
  sidebar.append(addProject);
}