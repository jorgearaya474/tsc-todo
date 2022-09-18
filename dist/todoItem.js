"use strict";
/**
 * TodoItem class
 * @author Jorge Araya
 * @since 1.0.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoItem = void 0;
class TodoItem {
    /**
     * Class constructor
     * @param id
     * @param task
     * @param complete
     */
    constructor(id, task, complete = false) {
        this.id = id;
        this.task = task;
        this.complete = complete;
        // no statements required
    }
    /**
     * Print todo method
     */
    printDetails() {
        console.log(`${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`);
    }
}
exports.TodoItem = TodoItem;
