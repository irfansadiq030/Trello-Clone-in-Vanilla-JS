// "use strict"; // Enable Strict Mode

/* <=================================== Elements / Variables ===================================> */

const sidebarClose = document.querySelector("#sidebarClose");
const openSidebar = document.querySelector("#openSidebar");
const boardName = document.querySelector("#boardName");
const addBoard = document.querySelector("#addBoard");
const sidebar = document.querySelector(".sidebar");
const boardsList = document.querySelector(".boards_list");
const boardTitle = document.querySelector(".active_board_title");
console.log(boardTitle.innerText)


/* <=================================== SIDEBAR FUNCTIONS ===================================> */

sidebarClose.addEventListener("click", function () {

    sidebar.classList.toggle("close_sidebar");

}, false)

openSidebar.addEventListener("click", function () {

    sidebar.classList.toggle("close_sidebar");

})

/* <=================================== ADDING BOARDS FUNCTIONS ===================================> */

let boards = [
    {
        id: 1,
        name: "Test",
        isActive: true,
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
        added_on: new Date()
    }

    boards.push(board);
    boardName.value = '';

    displayBoards();

    console.log(boards)

}, false)

// Add an event listener to the input field to handle Enter key press
boardName.addEventListener("keydown", function (e) {

    if (e.key === "Enter") {
        addBoard.click(); // Simulate a click on the "Add" button
    }

});

/* <=================================== lISTING BOARDS FUNCTIONS ===================================> */

const activateBoard = (boardId=1) => {

    for (const activeBoard of boards) {

        if (activeBoard.id === boardId) {
            activeBoard.isActive = true
            boardTitle.innerText = activeBoard.name

        }else{
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

        li.addEventListener("click", function () { activateBoard( board.id ) });

        boardsList.appendChild(li);
    }
}

displayBoards();

/* <=================================== UTILITY WITH ACTIVE BOARD FUNCTIONS ===================================> */

// for (const activeBoard of boards) {
    
//     if (activeBoard.isActive === true) {

//         boardTitle.textContent = activeBoard.name
//     }   
// }   





