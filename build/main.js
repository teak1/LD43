System.register(["./Color", "./Vector", "./Box", "./Canvas", "./stateManager", "./states", "./Renderables/Rect", "./Renderables/Polygon", "./renderQueue"], function (exports_1, context_1) {
    "use strict";
    var Color_1, Vector, Box_1, Canvas_1, stateManager_1, states_1, Rect_1, Polygon_1, renderQueue_1, last_frame_duration, state_manager, render_canvas, avg_frame_time, fremlen, frems, hooks, start_time, hook_exec_func, _hooks;
    var __moduleName = context_1 && context_1.id;
    function exec_all(all) {
        let index = 0;
        while (index < all.length) {
            hook_exec_func(all[index]);
            index++;
        }
    }
    function __render_loop() {
        renderQueue_1.default.empty();
        // hooks.update.forEach(hook => hook_exec_func(hook));
        // hooks.render.forEach(hook => hook_exec_func(hook));
        exec_all(hooks.update);
        exec_all(hooks.render);
        if (render_canvas)
            render_canvas.render();
        window.requestAnimationFrame(_ => __render_loop());
    }
    function __on(thing, func) {
        if (hooks[thing]) {
            hooks[thing].push(func);
            return true;
        }
        return false;
    }
    function create_render_surface({ width = innerWidth, height = innerHeight, parent = document.body }) {
        if (render_canvas) {
            throw new Error("a render surface already exists.");
        }
        render_canvas = Canvas_1.default.createCanvas(width, height);
        render_canvas.put(parent);
        return render_canvas;
    }
    return {
        setters: [
            function (Color_1_1) {
                Color_1 = Color_1_1;
            },
            function (Vector_1) {
                Vector = Vector_1;
            },
            function (Box_1_1) {
                Box_1 = Box_1_1;
            },
            function (Canvas_1_1) {
                Canvas_1 = Canvas_1_1;
            },
            function (stateManager_1_1) {
                stateManager_1 = stateManager_1_1;
            },
            function (states_1_1) {
                states_1 = states_1_1;
            },
            function (Rect_1_1) {
                Rect_1 = Rect_1_1;
            },
            function (Polygon_1_1) {
                Polygon_1 = Polygon_1_1;
            },
            function (renderQueue_1_1) {
                renderQueue_1 = renderQueue_1_1;
            }
        ],
        execute: function () {
            last_frame_duration = 0;
            state_manager = new stateManager_1.default();
            render_canvas = null;
            avg_frame_time = 0;
            fremlen = 30;
            frems = new Array(fremlen).fill(60);
            hooks = {
                pre_update: new Array(),
                update: new Array(),
                post_update: new Array(),
                pre_render: new Array(),
                render: new Array(),
                post_render: new Array(),
                register_graphics: new Array()
            };
            start_time = performance.now();
            hook_exec_func = function (func) {
                let __current_context = Canvas_1.default.getGlobalCanvas();
                let getState = state_manager.getReadonly();
                let rect = Rect_1.default.render;
                let polygon = Polygon_1.default.render;
                let context = {
                    getState,
                    rect,
                    polygon,
                    // circle,
                    Color: Color_1.default,
                    width: __current_context.canvas.width,
                    height: __current_context.canvas.height,
                    drawImage: (...args) => {
                        __current_context.context.drawImage.apply(__current_context.context, args);
                    }
                };
                func(context);
            };
            __render_loop();
            _hooks = states_1.HOOKS;
            window["CR"] = {
                Vector,
                Box: Box_1.default,
                on: __on,
                Canvas: Canvas_1.default,
                create_render_surface,
                Color: Color_1.default,
                STATES: states_1.STATES,
                EVENTS: states_1.EVENTS,
                hooks: _hooks,
                DEBUG: {
                    state_manager,
                    hooks,
                    getRenderDuration() {
                        return last_frame_duration;
                    },
                    render_queue() {
                        return renderQueue_1.default;
                    },
                    avg() {
                        return avg_frame_time;
                    }
                },
                setListeners(thing, func) {
                    render_canvas.addEventListener(thing, func);
                }
            };
            // rect = args > que.push([rect, args])
            // , circ, arc
        }
    };
});
//# sourceMappingURL=main.js.map