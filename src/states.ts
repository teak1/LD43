export enum STATES {
    physics_allowed = "physics_allowed",
    rendering_allowed = "rendering_allowed",
}
export enum HOOKS {
    register_graphics = "register_graphics",
    pre_update = "pre_update",
    update = "update",
    post_update = "post_update",
    pre_render = "pre_render",
    render = "render",
    post_render = "post_render"

}
export enum EVENTS {
    onMouseMove = "mousemove",
    onMouseDown = "mousedown",
    onMouseUp = "mouseup",
    onKeyDown = "keydown",
    onKeyUp = "keyup",
}
export default {
    STATES,
    HOOKS,
    EVENTS
}