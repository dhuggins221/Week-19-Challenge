
let db;

const request = indexedDB.open("budget_tracker", 1);

request.onupgradeneeded = function (event) {

  const db = event.target.result;

  db.createObjectStore("budget", { autoIncrement: true });
};

request.onsuccess = function (event) {
  
  db = event.target.result;

 
  if (navigator.onLine) {
    updateBudget();
  }
};


function saveRecord(record) {
  
  const transaction = db.transaction(["budget"], "readwrite");

  
  const budgetObjectStore = transaction.objectStore("budget");

  
  budgetObjectStore.add(record);
}

function updateBudget() {
  
  const transaction = db.transaction(["budget"], "readwrite");

  
  const budgetObjectStore = transaction.objectStore("budget");

  
  const getAll = budgetObjectStore.getAll();
  console.log(getAll);
}
window.addEventListener("online", updateBudget);