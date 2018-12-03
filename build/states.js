System.register([], function (exports_1, context_1) {
    "use strict";
    var STATES, HOOKS, EVENTS;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            (function (STATES) {
                STATES["physics_allowed"] = "physics_allowed";
                STATES["rendering_allowed"] = "rendering_allowed";
            })(STATES || (STATES = {}));
            exports_1("STATES", STATES);
            (function (HOOKS) {
                HOOKS["register_graphics"] = "register_graphics";
                HOOKS["pre_update"] = "pre_update";
                HOOKS["update"] = "update";
                HOOKS["post_update"] = "post_update";
                HOOKS["pre_render"] = "pre_render";
                HOOKS["render"] = "render";
                HOOKS["post_render"] = "post_render";
            })(HOOKS || (HOOKS = {}));
            exports_1("HOOKS", HOOKS);
            (function (EVENTS) {
                EVENTS["onMouseMove"] = "mousemove";
                EVENTS["onMouseDown"] = "mousedown";
                EVENTS["onMouseUp"] = "mouseup";
                EVENTS["onKeyDown"] = "keydown";
                EVENTS["onKeyUp"] = "keyup";
            })(EVENTS || (EVENTS = {}));
            exports_1("EVENTS", EVENTS);
            exports_1("default", {
                STATES,
                HOOKS,
                EVENTS
            });
        }
    };
});
//# sourceMappingURL=states.js.map