let forma = document.querySelector("#forma");
let toDoCount = 0;
let doingCount = 0;
let doneCount = 0;

function zidtsck() {
  overlay.classList.remove("hidden");
  forma.classList.remove("hidden", "opacity-0", "-translate-y-10");
  forma.classList.add("opacity-100", "translate-y-0");
}
function closeForma() {
  forma.classList.add("opacity-0", "-translate-y-10"); 
  overlay.classList.add("hidden"); 
  setTimeout(() => forma.classList.add("hidden"), 300); 
}

function updateCounters() {
  document.getElementById(
    "to-do-nbrAdded"
  ).textContent = `Total added: ${toDoCount}`;
  document.getElementById(
    "doing-nbrAdded"
  ).textContent = `Total added: ${doingCount}`;
  document.getElementById(
    "done-nbrAdded"
  ).textContent = `Total added: ${doneCount}`;
}

function addtask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  const date = document.getElementById("date").value;
  const section = document.getElementById("section").value;

  if (!title || !description || !date) {
    alert("Please fill in all fields!");
    return;
  }

  const task = document.createElement("div");
  task.classList.add(
    "p-1","m-2","rounded-xl","bg-white","border-4","transition-all","duration-300","transform","scale-90"
  );

  if (priority === "high") {
    task.classList.add("border-red-500");
  } else if (priority === "medium") {
    task.classList.add("border-yellow-500");
  } else if (priority === "low") {
    task.classList.add("border-green-500");
  }

  task.innerHTML = `
        <h3 class="font-bold">${title}</h3>
        <p class="overflow-hidden">${description}</p>
        <p class="text-gray-500 text-sm text-end">${new Date(
          date
        ).toLocaleString()}</p>
        <div class="flex flex-row justify-center space-x-2 mt-2">
            <button class="bg-red-500 w-1/2 text-white rounded-lg" onclick="deleteTask(this)">delete</button>
            <button class="bg-green-500 w-1/2 text-white rounded-lg" onclick="editStatus(this)">edit status</button>
        </div>
        `;

   setTimeout(
     () => task.classList.add( "transform", "scale-100"),50);
  if (section === "to-do") {
    document.getElementById("to-do").appendChild(task);
    toDoCount++;
  } else if (section === "doing") {
    document.getElementById("doing").appendChild(task);
    doingCount++;
  } else if (section === "done") {
    document.getElementById("done").appendChild(task);
    doneCount++;
  }

  updateCounters(); 

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("priority").value = "high";
  document.getElementById("date").value = "";
  document.getElementById("section").value = "to-do";

  closeForma();
}

function deleteTask(button) {
  const task = button.parentElement.parentElement;
  const section = task.parentElement.id; 

  if (section === "to-do") {
    toDoCount--;
  } else if (section === "doing") {
    doingCount--;
  } else if (section === "done") {
    doneCount--;
  }

  updateCounters(); 
  task.classList.add("opacity-0", "transform", "scale-75");
  setTimeout(() => task.remove(), 300);
}

function editStatus(button) {
  const task = button.parentElement.parentElement;

  const dropdown = document.createElement("select");
  dropdown.classList.add("status-dropdown","mt-2","border","border-gray-400","rounded-md");
  dropdown.innerHTML = `
        <option value="" disabled selected>Choose new status</option>
        <option value="to-do">To Do</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
    `;

  dropdown.addEventListener("change", function () {
    const selectedSection = dropdown.value;

    if (selectedSection) {
            const currentSection = task.parentElement.id;
            if (currentSection === "to-do") toDoCount--;
            else if (currentSection === "doing") doingCount--;
            else if (currentSection === "done") doneCount--;
            
            document.getElementById(selectedSection).appendChild(task); 
            updateCounters();
            dropdown.remove(); 
    }
  });

  
  task.appendChild(dropdown);
}

