//"use strict";
let tasks = [];

const getPriorityName = function (priority) {
  switch (priority) {
    case "1":
      return "High";
    case "2":
      return "Medium";
    case "3":
      return "Low";
    default:
      return "";
  }
};


const cancelTask = function(){
  renderTable();
}; 
const deleteTask = function (i) {
  if (!confirm("Are you sure ?")) return;
  tasks.splice(i, 1);
  renderTable();
};
const moveUp = function (i) {
  if (i == 0) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i - 1];
  tasks[i - 1] = oldTask;
  renderTable();
};
const moveDown = function (i) {
  if (i == tasks.length - 1) return;
  const oldTask = tasks[i];
  tasks[i] = tasks[i + 1];
  tasks[i + 1] = oldTask;
  renderTable();
};

const editTask = function (rowNum) {
  const tbody = document.querySelector("#tasks_tbody");
  tbody.innerHTML = "";
  tasks.forEach((t, i) => {
    
   console.log(rowNum)    
   var row = `
        <tr>
        <td>${i + 1}</td>
        <td>${t.name}</td>
        <td>${getPriorityName(t.priority)}</td>
        <td>
        ${
          i > 0
            ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
            : ``
        }
        ${
          i < tasks.length - 1
            ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
            : ``
        }
        </td>
        <td>
        <button id='editBtn' class="btn btn-primary btn-sm" onclick="editTask(${i})">Edit</button>
        <button id='saveBtn' class="btn btn-success btn-sm"  style="display:none;">Save</button>
        <button id='cancelBtn' class="btn btn-danger btn-sm" style="display:none;">Cancel</button>
        <button id='deleteBtn' class="btn btn-danger btn-sm" onclick="deleteTask(${i})">Delete</button></td>
        </tr>
        `;

    if(i == rowNum)
    {
      row = ` 
         <tr>
         <td>${i + 1}</td>
         <td contenteditable> ${t.name}</td>
         <td content editable>  
             <select id="task_priority" class="form-control">
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
              </select>
          </td>

         <td>
         ${
             i > 0
             ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
             : ``
          }
         ${
             i < tasks.length - 1
             ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
             : ``
          }
         </td>
         <td>
         <button id='saveBtn' class="btn btn-primary btn-sm" onclick="saveTask(${i})">Save</button>
         <button class="btn btn-success btn-sm" style="display:none;">edit</button>
         <button class="btn btn-danger btn-sm" style="display:none;">delete</button>
         <button id='cancelBtn' class="btn btn-danger btn-sm" onclick="cancelTask(${i})">Cancel</button></td>
         </tr>
       `;

       document.getElementById("task_priority").selectedIndex = t.priority;
    }
        
    tbody.insertAdjacentHTML("beforeEnd", row);
    
  });
};

const addTask = function () {
  console.log(this);
  const taskName = document.querySelector("#task_name").value;
  const priority = document.querySelector("#task_priority").value;
  if (taskName !== "" && priority > 0) {
    tasks.push({
      name: taskName,
      priority: priority,
    });
    renderTable();
  }
};

const saveTask = function (i) {
  console.log("saveeeee");
  var tab = document.getElementById("tasks_tbody");

  tr = tab.rows[i];
  const taskName = tr.cells[1].innerText;
  
  if (taskName !== "") {
    tasks[i].name = taskName; 
    //tasks[i].priority = priority; 
    renderTable();
  }
};

const renderTable = function () {
  const tbody = document.querySelector("#tasks_tbody");
  tbody.innerHTML = "";
  tasks.forEach((t, i) => {
    const row = `
        <tr>
        <td>${i + 1}</td>
        <td>${t.name}</td>
        <td>${getPriorityName(t.priority)}</td>
        <td>
        ${
          i > 0
            ? `<button class="btn btn-sm btn-secondary" onclick="moveUp(${i})">Up</button>`
            : ``
        }
        ${
          i < tasks.length - 1
            ? `<button class="btn btn-sm btn-secondary" onclick="moveDown(${i})">Down</button>`
            : ``
        }
        </td>
        <td>
        <button id='editBtn' class="btn btn-primary btn-sm" onclick="editTask(${i})">Edit</button>
        <button id='saveBtn' class="btn btn-success btn-sm"  style="display:none;">Save</button>
        <button id='cancelBtn' class="btn btn-danger btn-sm" style="display:none;">Cancel</button>
        <button id='deleteBtn' class="btn btn-danger btn-sm" onclick="deleteTask(${i})">Delete</button></td>
        </tr>
        `;
    
    
    tbody.insertAdjacentHTML("beforeEnd", row);
    
  });
};

document.querySelector("#add").addEventListener("click", addTask);
/*var name = "Test3";
var age = 22;
const calcFunction = () => {
  console.log(this);
  console.log(`My name is ${this.name} I'm ${this.age} years old`);
};
const obj = {
  name: "Test",
  age: 35,
  cal: calcFunction,
};

const obj2 = {
  name: "Test2",
  age: 22,
  cal: calcFunction,
};

function thisTest() {
  let obj1 = "Ramy";
  var obj2 = "Ahmed";
  console.log(this);
  const x = () => {
    console.log(this);
  };
  x();
}
*/