/**
 * TodoCollection class
 * @author Jorge Araya
 * @since 1.0.0
 */

import { TodoItem } from "./todoItem";

/**
 * item counts alias
 */
type itemCounts = {
    total: number,
    incomplete: number
}

export class TodoCollection{
    private nextId: number = 1;
    protected itemMap = new Map<number, TodoItem>();

    /**
     * Class constructor
     * @param userName 
     * @param todoItems 
     */
    constructor(
        public userName: string,
        public todoItems: TodoItem[] = [],
    ){
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }

    /**
     * Add todo method
     * @param task 
     * @returns number
     */
    addTodo(task: string): number{
        while(this.getTodoById(this.nextId)){
            this.nextId++;
        }

        this.itemMap.set(this.nextId, new TodoItem(this.nextId, task));

        return this.nextId;
    }

    /**
     * Get todo by id method
     * @param id 
     * @returns TodoItem
     */
    getTodoById(id: number): TodoItem{
        return this.itemMap.get(id);
    }

    /**
     * Get todos method
     * @param includeComplete 
     * @returns Todoitem array 
     */
    getTodoItems(includeComplete: boolean): TodoItem[] {
        return [...this.itemMap.values()].filter(item => includeComplete || !item.complete);
    }

    /**
     * Mark todo as complete method
     * @param id 
     * @param complete 
     */
    markComplete(id: number, complete: boolean){
        const todoItem = this.getTodoById(id);
        if (todoItem) todoItem.complete = complete;
    }

    /**
     * Remove complete todos mtehod
     */
    removeComplete() {
        this.itemMap.forEach(item => {
            if(item.complete) this.itemMap.delete(item.id);
        });
    }

    /**
     * Get items count
     * @returns Object itemCounts
     */
    getITemCounts(): itemCounts {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length
        };
    }
}