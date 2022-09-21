import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import * as inquirer from 'inquirer';
import {JsonTodoCollection} from "./jsonTodoCollection";

let todos = [
    new TodoItem(1, "Buy Milk"),
    new TodoItem(2, "Do homework", true),
    new TodoItem(3, "Call mom", true),
    new TodoItem(4, "Fix the sink")
];

let collection = new JsonTodoCollection("Jorge", todos);
let showCompleted = true;

function diasplayTodoList(): void {
    console.log(`${collection.userName}'s todo list ` + `(${ collection.getITemCounts().incomplete } items to do)`);
    
    collection.getTodoItems(showCompleted).forEach(
        item => item.printDetails()
    );
}

enum Commands {
    Add = "Add new task",
    Complete = "Complete task",
    Toggle = "Show/Hide Completed",
    Purge = "Remove completed tasks",
    Quit = "Quit"
}

function promptComplete(): void {
    console.clear();
    inquirer.prompt({
        type: 'checkbox',
        name: 'complete',
        message: 'Mark tasks complete',
        choices: collection.getTodoItems(showCompleted).map(item => (
            {
                name: item.task,
                value: item.id,
                checked: item.complete
            }
        ))
    }).then(answers => {
        let completedTasks = answers['complete'] as number[];
        collection.getTodoItems(true).forEach(item => {
            collection.markComplete(item.id, completedTasks.find(id => id==item.id) != undefined);
        })
        promptUser();
    })
}

function promptAdd(): void{
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
    })
}

function promptUser(): void {
    console.clear();
    diasplayTodoList();

    inquirer.prompt({
        type: 'list',
        name: 'command',
        message: 'Choose option',
        choices: Object.values(Commands),
        //badProperty: true,
    }).then(answers => {
        switch(answers['command']) {
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
            case Commands.Purge:
                collection.removeComplete();
                promptUser();
                break;
        }
    })
}

promptUser();
