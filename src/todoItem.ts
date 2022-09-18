/**
 * TodoItem class
 * @author Jorge Araya
 * @since 1.0.0
 */

export class TodoItem {
    
    /**
     * Class constructor
     * @param id 
     * @param task 
     * @param complete 
     */
    constructor(
        public id: number,
        public task: string,
        public complete: boolean = false
    ) 
    {
        // no statements required
    }

    /**
     * Print todo method
     */
    printDetails() : void {
        console.log(`${this.id}\t${this.task} ${this.complete ? "\t(complete)" : ""}`);
    }    
}