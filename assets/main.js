// "use strict"; // Enable Strict Mode

/* <=================================== Elements / Variables ===================================> */

const sidebarClose = document.querySelector("#sidebarClose");
const openSidebar = document.querySelector("#openSidebar");
const boardName = document.querySelector("#boardName");
const addBoard = document.querySelector("#addBoard");
const addCard = document.querySelector("#addCard");
const cardName = document.querySelector("#cardName");
const cardsContainer = document.querySelector("#cardsContainer");
const sidebar = document.querySelector(".sidebar");
const boardsList = document.querySelector(".boards_list");
const boardTitle = document.querySelector(".active_board_title");
const boardCardName = document.querySelector(".cardName");
const addTaskBtn = document.querySelector(".add_task_btn");


/* <=================================== SIDEBAR FUNCTIONS ===================================> */

sidebarClose.addEventListener("click", function () {

    sidebar.classList.toggle("close_sidebar");

}, false)

openSidebar.addEventListener("click", function () {

    sidebar.classList.toggle("close_sidebar");

})

/* <=================================== GENERATE RANDOM ID FUNCTION ===================================> */

function generateID() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const randomChar = alphabet[Math.floor(Math.random() * alphabet.length)];
    const randomString = Math.random().toString(16).slice(2);
    return randomChar + randomString;
}


/* <=================================== ADDING BOARDS FUNCTIONS ===================================> */

let boards = [
    {
        id: 1,
        name: "Test",
        isActive: true,
        cards: [],
        added_on: new Date()
    }
];


addBoard.addEventListener("click", function (e) {

    // Check if user have added board name in input field or not
    if (boardName.value === "") {
        alert("Please enter Board Name");
        return;
    }


    let board = {
        id: boards.at(-1).id + 1, // Get last indexed element of boards[] and increase 1 to make a sequence id of board.
        name: boardName.value,
        isActive: false,
        cards: [],
        added_on: new Date()
    }

    boards.push(board);
    boardName.value = '';

    displayBoards();

    // console.log(boards)

}, false)

// Add an event listener to the input field to handle Enter key press
boardName.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        addBoard.click(); // Simulate a click on the "Add" button
    }

});

/* <=================================== lISTING BOARDS FUNCTIONS ===================================> */

const activateBoard = (boardId = 1) => {

    for (const activeBoard of boards) {

        if (activeBoard.id === boardId) {
            activeBoard.isActive = true
            boardTitle.innerText = activeBoard.name

            // Render Cards of Active Boards
            displayCards(activeBoard.id);

        } else {
            activeBoard.isActive = false
        }
    }
}

activateBoard();

const displayBoards = () => {

    boardsList.innerHTML = "";

    for (const board of boards) {

        const li = document.createElement("li");
        li.id = board.id
        li.className = "text-xl mb-4 bg-white rounded-lg py-3 pl-2 border-b-2 border-yellow-300 hover:shadow-md cursor-pointer board_active";
        li.textContent = board.name;

        li.addEventListener("click", function () { activateBoard(board.id) });

        boardsList.appendChild(li);
    }
}

displayBoards();

/* <=================================== ADD NEW Card ===================================> */

addCard.addEventListener("click", function () {

    if (cardName.value === "") {

        alert("Add Card Name Please!")
        return;
    }

    // Adding New Board to the Active Card
    for (const activeBoard of boards) {

        if (activeBoard.isActive === true) {

            let newCard = {

                name: cardName.value,
                id: generateID(),
                created_on: new Date(),
                tasks: [
                    // {
                    //     name: 'default task',
                    //     completed: false
                    // }
                ]
            }

            let activeCardIndex = boards.indexOf(activeBoard); // Get Index Number of the active Board

            boards[activeCardIndex].cards.push(newCard); // Pushing new card to the active board's card's array

            displayCards(activeBoard.id);
            // console.log(activeBoard.id)
        }
    }
    cardName.value = ""

    // console.log(boards)

}, false);

// Add an event listener to the input field to handle Enter key press
cardName.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        addCard.click(); // Simulate a click on the "Add" button
    }

});

/* <=================================== DISPLAY CARDS of Active BOARD ===================================> */

function displayCards(activateBoardId = 1) {

    for (const board of boards) {

        if (board.id === activateBoardId) {

            renderCards(board.cards)
        }
    }
}


/* <=================================== RENDER CARDS of Active BOARD ===================================> */

function renderCards(activeBoardCards) {

    // console.log(`Active Board's Cards : ${activeBoardCards}`)
    // Creating this functions Global Variables:
    let card;
    // Card Header Variables - start
    let cardNameConatiner;
    let cardName;
    let cardContextMenu;
    let menuIcon;
    // Card Header Variables - end

    // Card Task List Variables -start
    // let taskUlEl = document.createElement("ul");
    let taskLiEl;
    let taskNameEl;
    let taskActionsEl;
    let taskActionEditEl;
    let taskActionDelEl;
    // Card Task List Variables -end

    // Card Add New Task Variables -start

    let formContainer;
    let addNewTaskField;
    let addNewTaskBtn;
    // Card Add New Task Variables -end


    cardsContainer.innerHTML = ''; // EMPTY the Cards container

    if (activeBoardCards.length === 0) {

        return;
    }

    for (const activeCard of activeBoardCards) {

        // console.log(activeCard.tasks)

        card = document.createElement("div")
        card.className = "board_card shadow-md hover:shadow-lg rounded-md min-h-80 bg-white mr-5 p-5";
        card.id = activeCard.id;
        let taskUlEl = document.createElement("ul");
        taskUlEl.className = "taskUl";

        renderCardHeader(activeCard);

        card.appendChild(cardNameConatiner);


        // card.appendChild(taskUlEl);
        cardsContainer.prepend(card);
        // renderTasksOfCard(activeCard) // caling the function by sending activeCard id to render its tasks.


        renderAddNewTaskForm(activeCard.id);
        card.appendChild(taskUlEl);
        displayTasks(activeCard)
    }

    function renderCardHeader(activeCard) {

        cardNameConatiner = document.createElement('div');
        cardNameConatiner.className = "flex justify-between items-center w-full h-8";

        cardName = document.createElement("div");
        cardName.className = "cardName text-xl font-semibold";
        cardName.innerText = activeCard.name;

        cardContextMenu = document.createElement("div");
        menuIcon = document.createElement("span");
        menuIcon.className = "material-symbols-outlined mt-2 hover:bg-yellow-300 cursor-pointer rounded-full p-1";
        menuIcon.textContent = 'more_horiz';

        cardContextMenu.appendChild(menuIcon);

        // Append both cardName and cardContextMenu to cardNameConatiner
        cardNameConatiner.appendChild(cardName);
        cardNameConatiner.appendChild(cardContextMenu);


    }

    // function renderTaskList(task, activeCard) {

    //     let currentCardId = '#' + activeCard.id;

    //     // let taskUlEl = document.createElement("ul");

    //     let curentCard = document.querySelector(currentCardId);
    //     taskUlEl.className = "mt-5";
    //     // console.log(curentCard)

    //     taskLiEl = document.createElement("li");
    //     taskLiEl.className = "mb-3 bg-white shadow-md rounded-md py-4 px-3 flex justify-between hover:shadow-lg";

    //     taskNameEl = document.createElement("span");
    //     taskNameEl.textContent = task.name;

    //     taskLiEl.appendChild(taskNameEl);
    //     // taskUlEl.appendChild(taskLiEl);

    //     renderTaskActions(); // calling the function that shows task actions like Edit/Delete the task.
    //     return taskLiEl;

    //     // curentCard.appendChild(taskUlEl);
    // }



    function renderAddNewTaskForm(cardId) {

        formContainer = document.createElement("div");
        formContainer.className = "flex items-center justify-between w-full mt-5";

        addNewTaskField = document.createElement("input");
        addNewTaskField.type = 'text';
        addNewTaskField.className = `task_name_${cardId} form-input w-full px-2 py-2 border rounded-md`;
        addNewTaskField.placeholder = "Add New Task..";
        addNewTaskField.id = `task_name_${cardId}`;

        addNewTaskBtn = document.createElement("button");
        addNewTaskBtn.className = `add_task_btn bg-black ml-2 text-white rounded-full`;
        addNewTaskBtn.id = cardId;
        addNewTaskBtn.addEventListener("click", function () {


            // addNewTask(cardId)
            // debugger;
            let taskName = document.getElementById(`task_name_${cardId}`);

            let newTask = {
                id: generateID(),
                name: taskName.value,
                completed: false
            }

            taskName.value = '';

            // Find the active board dynamically
            let activeBoard = boards.find(board => board.isActive);

            // Check if the active board is found
            if (activeBoard) {
                // Find the matching card in the active board
                let matchingCard = activeBoard.cards.find(card => card.id === cardId);

                // Check if a matching card is found
                if (matchingCard) {
                    // Add a new task to the tasks array of the matching card
                    let currentCardId = '#' + matchingCard.id;
                    let curentCard = document.querySelector(currentCardId);

                    matchingCard.tasks.push(newTask);
                    displayTasks(matchingCard);
                }
            }

        });


        let addTaskIcon = document.createElement('span');
        addTaskIcon.className = 'material-symbols-outlined w-8 h-8 flex items-center justify-center';
        addTaskIcon.textContent = 'add';

        addNewTaskBtn.appendChild(addTaskIcon);
        formContainer.appendChild(addNewTaskField);
        formContainer.appendChild(addNewTaskBtn);

        card.appendChild(formContainer);

    }

    /* <=================================== Render the Task ===================================> */

}

function renderTaskActions(task, card) {

    taskActionsEl = document.createElement("span");
    taskActionsEl.className = "action flex";

    taskActionEditEl = document.createElement("span");
    taskActionEditEl.className = "material-symbols-outlined pr-3 cursor-pointer hover:text-yellow-600";
    taskActionEditEl.textContent = "edit";
    taskActionEditEl.id = `edit_${task.id}`;

    // Attaching on click event of each task edit buttton
    // taskActionEditEl.addEventListener("click", function (e) {

    //     deleteTask(task);
    // })

    taskActionDelEl = document.createElement("span");
    taskActionDelEl.className = "material-symbols-outlined cursor-pointer hover:text-red-500";
    taskActionDelEl.textContent = "delete";
    taskActionDelEl.id = `del_${task.id}`;

    // Attaching on click event of each task delete buttton
    taskActionDelEl.addEventListener("click", function (e) {

        deleteTask(task, card);
    })

    taskActionsEl.appendChild(taskActionEditEl)
    taskActionsEl.appendChild(taskActionDelEl)
    return taskActionsEl;
}

/* <=================================== Display/Render the Tasks of card ===================================> */

// function displayTasks(card) {

//     let currentCardId = '#' + card.id;
//     let curentCard = document.querySelector(currentCardId);
//     let taskUlEl = curentCard.querySelector('ul');

//     taskUlEl.innerHTML = "";


//     curentCard.appendChild(taskUlEl);

//     if (card.tasks.length != 0) {

//         // console.log(curentCard)

//         // Iterate through boards and cards to find the matching card
//         for (let curentTask of card.tasks) {


//             taskUlEl.className = "mt-5 taskUl";

//             let taskLiEl = document.createElement("li");
//             taskLiEl.className = "mb-3 bg-white shadow-md rounded-md py-4 px-3 flex justify-between hover:shadow-lg";
//             taskLiEl.id = `task_${curentTask.id}`
//             taskLiEl.draggable = 'true'

//             taskLiEl.addEventListener("dragstart", function (e) {

//                 // console.log(e)
//                 // taskDragAndDrop(taskLiEl)
//                 let selected = e.target

//                 console.log(taskUlEl)

//                 taskUlEl.addEventListener("dragover", function (e) {

//                     e.preventDefault();
//                     this.style.border = "2px dashed #ccc"
//                 })

//                 taskUlEl.addEventListener("dragleave", function (e) {

//                     this.style.border = ""
//                 })

//                 taskUlEl.addEventListener("drop", function (e) {

//                     e.preventDefault();
//                     this.style.border = ""

//                     this.appendChild(selected)
//                     console.log(this)
//                     console.log(selected)
//                 })
//             })



//             taskNameEl = document.createElement("span");
//             taskNameEl.textContent = curentTask.name;

//             taskLiEl.appendChild(taskNameEl);
//             taskUlEl.appendChild(taskLiEl);

//             let taskActionsEl = renderTaskActions(curentTask, card); // calling the function that shows task actions like Edit/Delete the task.
//             taskLiEl.appendChild(taskActionsEl)
//             curentCard.appendChild(taskUlEl)
//         }


//     } else {
//         // console.log('err')
//     }


// }

// New function with drag and drop
function displayTasks(card) {
    let currentCardId = '#' + card.id;
    let curentCard = document.querySelector(currentCardId);
    let taskUlEl = curentCard.querySelector('ul');

    taskUlEl.innerHTML = "";

    curentCard.appendChild(taskUlEl);

    if (card.tasks.length !== 0) {
        taskUlEl.className = "mt-5 taskUl rounded-md py-5";

        // Iterate through tasks
        for (let curentTask of card.tasks) {
            let taskLiEl = document.createElement("li");
            taskLiEl.className = "mb-3 bg-white shadow-md rounded-md py-4 px-3 flex justify-between hover:shadow-lg";
            taskLiEl.id = `task_${curentTask.id}`;
            taskLiEl.draggable = 'true';

            let taskNameEl = document.createElement("span");
            taskNameEl.textContent = curentTask.name;

            taskLiEl.appendChild(taskNameEl);
            taskUlEl.appendChild(taskLiEl);

            let taskActionsEl = renderTaskActions(curentTask, card);
            taskLiEl.appendChild(taskActionsEl);
        }

        // Add drag and drop event listeners outside the loop
        taskUlEl.addEventListener("dragover", function (e) {
            e.preventDefault();
            this.style.border = "2px dashed #ccc";
        });

        taskUlEl.addEventListener("dragleave", function (e) {
            this.style.border = "";
        });

        taskUlEl.addEventListener("drop", function (e) {

            let cardId = this.parentElement.id
            // console.log(cardId)

            e.preventDefault();
            this.style.border = "";

            // Handle the drop logic here
            let selected = document.querySelector(".taskUl li.dragging");
            this.appendChild(selected);

            moveTaskToCard(cardId, selected.id)

        });

        // Add dragstart and dragend listeners to each task
        let tasks = document.querySelectorAll(".taskUl li");
        tasks.forEach(task => {
            task.addEventListener("dragstart", function () {

                this.classList.add("dragging");

            });

            task.addEventListener("dragend", function () {
                this.classList.remove("dragging");
            });
        });
    }
}


/* <=================================== Edit Task Function ===================================> */
function deleteTask(taskId, card) {

    let taskEl = document.querySelector("#task_" + taskId.id)

    let taskIndex = card.tasks.findIndex(task => task.id === taskId.id)

    if (taskIndex !== -1) {  // making sure that task has been found

        card.tasks.splice(taskIndex, 1) // Removing task from tasks arrya as well.

        if (taskEl) {
            // Remove the task element from the DOM
            taskEl.remove();

        }

    }
    else {
        console.log("Task element not found");
    }
}


/* <=================================== DRAG AND DROP Functionality - Move Element in Objects ===================================> */

// Function to get the dragged task based on task ID
function getDraggedTask(taskId) {

    // Iterate through all boards and cards to find the task
    for (const board of boards) {

        for (const card of board.cards) {

            const taskIndex = card.tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                // Remove the task from the card
                const draggedTask = card.tasks.splice(taskIndex, 1)[0];
                return draggedTask;
            }

        }
    }
    return null; // Task not found
}

function moveTaskToCard(cardId, taskId) {

    taskId = removeTaskPrefix(taskId);

    for (const board of boards) {

        if (board.isActive) {

            let targetCard = board.cards.find(card => card.id === cardId)

            // Find the index of the task with the provided task ID
            const draggedTask = getDraggedTask(taskId)

            targetCard.tasks.push(draggedTask)
            // console.log(`Actual Card: ${targetCard.id} and recieved card id : ${cardId}`)
        }

    }

}

function removeTaskPrefix(taskId) {

    return taskId.slice(5)
}




