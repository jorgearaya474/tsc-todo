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
console.log(`${collection.userName}'s todo list ` + `(${ collection.getITemCounts().incomplete } items to do)`);

//collection.removeComplete();
collection.getTodoItems(true).forEach(
    item => item.printDetails()
);
