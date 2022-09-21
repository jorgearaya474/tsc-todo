/**
 * JsonTodoCollection class
 * @extends todoCollection
 * @author Jorge Araya
 * @since 1.0.0
 */

import { TodoItem } from "./todoItem";
import { TodoCollection } from "./todoCollection";
import * as lowdb from "lowdb";
import * as FileSync from "lowdb/adapters/FileSync";

type shcemaType = {
    tasks: {
        id: number;
        task: string;
        complete: boolean;
    }[]
};

export class JsonTodoCollection extends TodoCollection {
    // define databse
    private database: lowdb.LowdbSync<shcemaType>;

    /**
     * Class constructor
     * @param userName 
     * @param todoItems 
     */
    constructor(
        public userName: string,
        todoItems: TodoItem[] = []
    ) {
        super(userName, []);

        this.database = lowdb(new FileSync("Todos.json")); 
        if (this.database.has("tasks").value()) { 
            let dbItems = this.database.get("tasks").value(); 
            dbItems.forEach(item => 
                this.itemMap.set(item.id, new TodoItem(item.id, item.task, item.complete))
            );
        } else { 
            this.database.set("tasks", todoItems).write(); 
            todoItems.forEach(item => this.itemMap.set(item.id, item)); 
        }
    }

    /**
     * Add todo task - super
     * @param task 
     * @returns number
     * @since 1.0.0
     */
    addTodo(task: string): number {        
        let result = super.addTodo(task);        
        this.storeTasks();        
        return result;    
    }    
    
    /**
     * Mark complete task - super
     * @param id 
     * @param complete 
     * @since 1.0.0
     */
    markComplete(id: number, complete: boolean): void {        
        super.markComplete(id, complete);        
        this.storeTasks();    
    }    
    
    /**
     * Remove complete - super
     * @since 1.0.0
     */
    removeComplete(): void {        
        super.removeComplete();        
        this.storeTasks();    
    }    
    
    /**
     * Store method
     * @since 1.0.0
     */
    private storeTasks() {    
        this.database.set("tasks", [...this.itemMap.values()]).write();    
    }
}