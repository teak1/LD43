System.register([], function (exports_1, context_1) {
    "use strict";
    var RenderQueue, render_queue;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            RenderQueue = class RenderQueue {
                constructor() {
                    this.items = new Array();
                }
                empty() {
                    this.items = new Array();
                }
                add(thing) {
                    this.items.push(thing);
                }
                get() {
                    return this.items.shift();
                }
            };
            render_queue = new RenderQueue;
            exports_1("default", render_queue);
        }
    };
});
//# sourceMappingURL=renderQueue.js.map