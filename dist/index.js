"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const todoItem_1 = require("./todoItem");
const todoCollection_1 = require("./todoCollection");
let todos = [
    new todoItem_1.TodoItem(1, "Buy Milk"),
    new todoItem_1.TodoItem(2, "Do homework", true),
    new todoItem_1.TodoItem(3, "Call mom", true),
    new todoItem_1.TodoItem(4, "Fix the sink")
];
let collection = new todoCollection_1.TodoCollection("Jorge", todos);
console.clear();
console.log(`${collection.userName}'s todo list`);
collection.getTodoItems(true).forEach(item => item.printDetails());
//let newId = collection.addTodo("Clean the house");
//let todoItem = collection.getTodoById(newId);
//todoItem.printDetails();
//collection.addTodo(todoItem);
//console.log(JSON.stringify(todoItem));
