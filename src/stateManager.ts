export default class StateManager {
    private states: Object = {};
    readonly: Function = (state: string) => {
        return this.states[state];
    }
    getState(state: string) {
        return this.states[state];
    }
    setState(state: string, value: boolean) {
        this.states[state] = value;
    }
    getReadonly() {
        return this.readonly
    }
}