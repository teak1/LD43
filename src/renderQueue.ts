class RenderQueue {
    private items: any[] = new Array<any>();
    empty() {
        this.items = new Array<any>();
    }
    add(thing: any) {
        this.items.push(thing);
    }
    get() {
        return this.items.shift();
    }
}

let render_queue = new RenderQueue;
export default render_queue;