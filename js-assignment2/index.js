const inputValue = document.getElementById("input-value");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

document.addEventListener("DOMContentLoaded", showData);

addBtn.addEventListener("click", () => {
  const cleanInput = inputValue.value.toLowerCase().trim();
  if (!cleanInput.length) {
    alert("enter a task");
    return;
  }
  addTask(cleanInput);
  inputValue.value = "";
  saveData();
});

const addTask = (input) => {
  const newTask = document.createElement(`li`);
  newTask.textContent = input;

  const removeBtn = document.createElement("span");
  removeBtn.innerHTML = "\u00d7";
  removeBtn.classList.add("remove-btn");

  removeBtn.addEventListener("click", () => {
    newTask.remove();
    saveData();
  });
  newTask.appendChild(removeBtn);
  newTask.addEventListener("click", (event) => {
    if (event.target !== removeBtn) {
      newTask.classList.toggle("checked");
      saveData();
    }
  });
  taskList.appendChild(newTask);
  saveData();
};
const saveData = () => {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((task) => {
    tasks.push({
      text: task.firstChild.textContent,
      completed: task.classList.contains("checked"),
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
// to enable hoisting
function showData() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    addTask(task.text);
    if (task.completed) {
      taskList.lastChild.classList.add("checked");
    }
  });
}
