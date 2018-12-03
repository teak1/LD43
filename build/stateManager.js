System.register([], function (exports_1, context_1) {
    "use strict";
    var StateManager;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            StateManager = class StateManager {
                constructor() {
                    this.states = {};
                    this.readonly = (state) => {
                        return this.states[state];
                    };
                }
                getState(state) {
                    return this.states[state];
                }
                setState(state, value) {
                    this.states[state] = value;
                }
                getReadonly() {
                    return this.readonly;
                }
            };
            exports_1("default", StateManager);
        }
    };
});
//# sourceMappingURL=stateManager.js.map