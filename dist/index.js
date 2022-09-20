"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const inquirer = require("inquirer");
const jsonTodoCollection_1 = require("./jsonTodoCollection");
let todos = [
    new todoItem_1.TodoItem(1, "Buy Milk"),
    new todoItem_1.TodoItem(2, "Do homework", true),
    new todoItem_1.TodoItem(3, "Call mom", true),
    new todoItem_1.TodoItem(4, "Fix the sink")
];
let collection = new jsonTodoCollection_1.JsonTodoCollection("Jorge", todos);
let showCompleted = true;
function diasplayTodoList() {
    console.log(`${collection.userName}'s todo list ` + `(${collection.getITemCounts().incomplete} items to do)`);
    collection.getTodoItems(showCompleted).forEach(item => item.printDetails());
}
var Commands;
(function (Commands) {
    Commands["Add"] = "Add new task";
    Commands["Complete"] = "Complete task";
    Commands["Toggle"] = "Show/Hide Completed";
    Commands["Purge"] = "Remove completed tasks";
    Commands["Quit"] = "Quit";
})(Commands || (Commands = {}));
function promptComplete() {
    console.clear();
    inquirer.prompt({
        type: 'checkbox',
        name: 'complete',
        message: 'Mark tasks complete',
        choices: collection.getTodoItems(showCompleted).map(item => ({
            name: item.task,
            value: item.id,
            checked: item.complete
        }))
    }).then(answers => {
        let completedTasks = answers['complete'];
        collection.getTodoItems(true).forEach(item => {
            collection.markComplete(item.id, completedTasks.find(id => id == item.id) != undefined);
        });
        promptUser();
    });
}
function promptAdd() {
    console.clear();
    inquirer.prompt({
        type: 'input',
        name: 'add',
        message: 'Enter task:',
    }).then(answers => {
        if (answers['add'] != '') {
            collection.addTodo(answers['add']);
        }
        promptUser();
    });
}
function promptUser() {
    console.clear();
    diasplayTodoList();
    inquirer.prompt({
        type: 'list',
        name: 'command',
        message: 'Choose option',
        choices: Object.values(Commands),
        //badProperty: true,
    }).then(answers => {
        switch (answers['command']) {
            case Commands.Toggle:
                showCompleted = !showCompleted;
                promptUser();
                break;
            case Commands.Add:
                promptAdd();
                break;
            case Commands.Complete:
                (collection.getITemCounts().incomplete > 0) ? promptComplete() : promptUser();
                break;
        }
    });
}
promptUser();
