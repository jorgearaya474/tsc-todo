"use strict";
/**
 * TodoCollection class
 * @author Jorge Araya
 * @since 1.0.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoCollection = void 0;
const todoItem_1 = require("./todoItem");
class TodoCollection {
    /**
     * Class constructor
     * @param userName
     * @param todoItems
     */
    constructor(userName, todoItems = []) {
        this.userName = userName;
        this.todoItems = todoItems;
        this.nextId = 1;
        this.itemMap = new Map();
        todoItems.forEach(item => this.itemMap.set(item.id, item));
    }
    /**
     * Add todo method
     * @param task
     * @returns number
     */
    addTodo(task) {
        while (this.getTodoById(this.nextId)) {
            this.nextId++;
        }
        this.itemMap.set(this.nextId, new todoItem_1.TodoItem(this.nextId, task));
        return this.nextId;
    }
    /**
     * Get todo by id method
     * @param id
     * @returns TodoItem
     */
    getTodoById(id) {
        return this.itemMap.get(id);
    }
    /**
     * Get todos method
     * @param includeComplete
     * @returns Todoitem array
     */
    getTodoItems(includeComplete) {
        return [...this.itemMap.values()].filter(item => includeComplete || !item.complete);
    }
    /**
     * Mark todo as complete method
     * @param id
     * @param complete
     */
    markComplete(id, complete) {
        const todoItem = this.getTodoById(id);
        if (todoItem)
            todoItem.complete = complete;
    }
    /**
     * Remove complete todos mtehod
     */
    removeComplete() {
        this.itemMap.forEach(item => {
            if (item.complete)
                this.itemMap.delete(item.id);
        });
    }
    /**
     * Get items count
     * @returns Object itemCounts
     */
    getITemCounts() {
        return {
            total: this.itemMap.size,
            incomplete: this.getTodoItems(false).length
        };
    }
}
exports.TodoCollection = TodoCollection;
