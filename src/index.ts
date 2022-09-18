import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";

let todos = [
    new TodoItem(1, "Buy Milk"),
    new TodoItem(2, "Do homework", true),
    new TodoItem(3, "Call mom", true),
    new TodoItem(4, "Fix the sink")
];

let collection = new TodoCollection("Jorge", todos);

console.clear();
console.log(`${collection.userName}'s todo list`);

collection.getTodoItems(true).forEach(
    item => item.printDetails()
);

//let newId = collection.addTodo("Clean the house");
//let todoItem = collection.getTodoById(newId);
//todoItem.printDetails();
//collection.addTodo(todoItem);

//console.log(JSON.stringify(todoItem));