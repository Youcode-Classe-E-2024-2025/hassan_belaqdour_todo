let forma = document.querySelector("#forma");
let toDoCount = 0;
let doingCount = 0;
let doneCount = 0;

function zidtsck() {
  forma.classList.remove("hidden"); // Affiche la forma en retirant 'hidden'
}
// Fonction pour fermer la forma
function closeForma() {
  forma.classList.add("hidden"); // Cache la forma en ajoutant 'hidden'
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
  // recherche sur les valeurs des infos
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  const date = document.getElementById("date").value;
  const section = document.getElementById("section").value;

  // verefication si les div sont remplis
  if (!title || !description || !date) {
    alert("Please fill in all fields!");
    return;
  }

  // creer un element de tache
  const task = document.createElement("div");
  task.classList.add("p-1", "m-2", "rounded-xl", "bg-white", "border-4");

  // les couleur de priority
  if (priority === "high") {
    task.classList.add("border-red-500");
  } else if (priority === "medium") {
    task.classList.add("border-yellow-500");
  } else if (priority === "low") {
    task.classList.add("border-green-500");
  }

  // Ajouter le contenu de la tache
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

  // ajout du contenu de la formulaire dans la partie to do
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

  updateCounters(); // mettre a jour les conteurs

  // Vider le formulaire
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("priority").value = "high";
  document.getElementById("date").value = "";
  document.getElementById("section").value = "to-do";

  // Fermer la forma
  closeForma();
}

function deleteTask(button) {
  const task = button.parentElement.parentElement;
  const section = task.parentElement.id; // Get the section ID

  // Decrease the corresponding counter
  if (section === "to-do") {
    toDoCount--;
  } else if (section === "doing") {
    doingCount--;
  } else if (section === "done") {
    doneCount--;
  }

  updateCounters(); // mettre a jour les conteurs
  task.remove(); // supprimmer le task
}

function editStatus(button) {
  const task = button.parentElement.parentElement;

  // Creation du menu pour choisir la nouvelle section
  const dropdown = document.createElement("select");
  dropdown.classList.add("status-dropdown","mt-2","border","border-gray-400","rounded-md");
  dropdown.innerHTML = `
        <option value="" disabled selected>Choose new status</option>
        <option value="to-do">To Do</option>
        <option value="doing">Doing</option>
        <option value="done">Done</option>
    `;

  // l'evenement qui fais le deplacemant lorsque le choix est fait
  dropdown.addEventListener("change", function () {
    const selectedSection = dropdown.value;

    if (selectedSection) {
            const currentSection = task.parentElement.id;
            if (currentSection === "to-do") toDoCount--;
            else if (currentSection === "doing") doingCount--;
            else if (currentSection === "done") doneCount--;
            
            document.getElementById(selectedSection).appendChild(task); // deplacemant de tache
            updateCounters();
            dropdown.remove(); // supprimer le menu apres son deplacement
    }
  });

  // Ajouter le menu sous le bouton "edit status"
  task.appendChild(dropdown);
}

