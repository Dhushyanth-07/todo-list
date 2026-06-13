const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const taskCount = document.getElementById("taskCount");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderTasks();

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

function addTask(){

    const taskText = taskInput.value.trim();

    if(taskText === "") return;

    tasks.push({
        text: taskText,
        completed:false
    });

    saveTasks();
    renderTasks();

    taskInput.value="";
}

function renderTasks(){

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        const li=document.createElement("li");

        li.className="task";

        li.innerHTML=`
            <div class="left">
                <input type="checkbox"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${index})">

                <span class="${task.completed ? "completed" : ""}">
                    ${task.text}
                </span>
            </div>

            <button class="delete-btn"
            onclick="deleteTask(${index})">
            Delete
            </button>
        `;

        taskList.appendChild(li);

    });

    updateStats();
}

function toggleTask(index){

    tasks[index].completed = !tasks[index].completed;

    saveTasks();
    renderTasks();
}

function deleteTask(index){

    tasks.splice(index,1);

    saveTasks();
    renderTasks();
}

function updateStats(){

    totalTasks.textContent = tasks.length;

    const completed = tasks.filter(task=>task.completed).length;

    completedTasks.textContent = completed;

    taskCount.textContent = `${tasks.length} Items`;
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}