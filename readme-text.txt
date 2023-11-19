Logic Of this APP:

1- How to add New Board Logic works??

First we add the name of the board, in sidebar. After adding name.
user will click on the Add Board button. 
if user click on button directly without adding board name than we will display an alert that please enter name of the board.
if it is NOT empty than we have added an eventListner to addBoard constant and in this event. We have defined our logic for adding boards.

We have created  created an array with name boards[] already in Global Scope.

So that when user click on Add Board button we will create a object with name board{} and we will push this new board to the boards array.

Here on this button click we are also calling the function displayBoards() which will loop through boards array and display its all board names in sidebar.


Function: displayBoard() Function working:

This function will first empty the UL element.
Than we will loop through boards array, and than create a new li element and append that element into UL.

We are also attaching a addEventListner method to each element so than whenever user click on any board that method will executes and we can activate that clicked board.

We are also calling this displayBoard function to display some default data, when user open page first time.


Function: activateBoard() working:-

This function is attached to each li tags of board Name. 
when user click on any board name activateBoard will be called. 
This function takes board ID as a parameter. 

This function will loop through boards array and than in the loop body it will check the board id with each looped item, if it matched. than it will change the isActive = true.

After changing the status of board to active we will call the another function displayCard() in the body of the activateBoard() function.

Function: displayCard() working:

This function will take activeBoard id as argument. so that this function display cards of this active board's card.

Working:

we will loop through the boards array.
than we will get check the id of each board with the passed id if it is matched than we will call another function renderCards().

Function: renderCard() working:

This function will recieved cards array of the active board as an argument.

in this function we have defined some global variables so that we can use those variables in any other functions.


Drag and Drop Functionality:



