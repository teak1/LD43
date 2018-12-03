Math.TAU = 2 * Math.PI;
let frameCount = 0;
let keys = {
    w: false,
    a: false,
    s: false,
    d: false,
    " ": false
};
document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);
document.addEventListener("mousedown", function (event) {
    mouse(event);
    mousedown = 1;
});
document.addEventListener("mouseup", function (event) {
    mouse(event);
    mousedown = 0;
})
document.addEventListener("mousemove", function (event) {
    mouse(event);
    if (mousedown) mousedown++;
});

let mousedown = false;
let mousePos = new CR.Vector.Vector2(0, 0);

function mouse(event) {
    mousePos.x = event.clientX - width / 2;
    mousePos.y = event.clientY - height / 2;
}
let grave = Object.assign(new Image(), {
    src: `sprites/enemynormal_dead.png`
});
let Villager_spr = Object.assign(new Image(), {
    src: "sprites/villagernormal_idle.png"
})
score = 0;
villagers_alive = 0;
Can = CR.create_render_surface({
    width: 1920,
    height: 1080
});
let width = CR.Canvas.getGlobalCanvas().canvas.width
let height = CR.Canvas.getGlobalCanvas().canvas.height;
CR.on(CR.hooks.render, function (context) {
    context.rect(width / 2, height / 2, width, height, context.Color("#444"), context.Color("#444"));
    context.rect(mousePos.x + width / 2, mousePos.y + height / 2, 2, 2, context.Color("white"), context.Color("white"));
    let ctx = CR.Canvas.getGlobalCanvas().context;
    // for (let i = 0; i < villagers.length && !this.grabbing; i++) {
    //     let v = villagers[i];
    //     if (v.moused) {
    //         ctx.globalAlpha = 0.2;
    //         ctx.fillStyle = "white";
    //         ctx.strokeStyle = "white";
    //         ctx.beginPath();
    //         ctx.arc(v.pos.x + width / 2, v.pos.y + height / 2, v.r + 4, 0, Math.TAU);
    //         ctx.closePath();
    //         ctx.fill();
    //         ctx.stroke();
    //         ctx.globalAlpha = 1;
    //         break;
    //     }
    // }
    buildings.forEach(v => v.render(context));
    villagers.forEach(v => v.render(context));
    villagers.forEach(v => {
        if (v.state == "idle") {
            context.rect(width / 2 + v.pos.x - 20 + 20 * v.hp / v.maxHP, height / 2 + v.pos.y - 50, 40 * v.hp / v.maxHP, 10, context.Color("#0f0"), context.Color("#0f0"));
            context.rect(width / 2 + v.pos.x + 20 - 20 * (1 - v.hp / v.maxHP), height / 2 + v.pos.y - 50, 40 * (1 - v.hp / v.maxHP), 10, context.Color("red"), context.Color("red"));
        }
    });
    enemies.forEach(v => v.render(context));
    player.render(context);

    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText(score, width - 100, 50);
    context.drawImage(grave, width - 160, 12);
    ctx.fillText(villagers_alive, width - 100, 80 + 36);
    context.drawImage(Villager_spr, width - 160, 80);
    frameCount++;
});
var enemies = [];
var villagers = [];
var buildings = [];
var player = new Player(0, 0);
var grid = new Array(101).fill(0).map(_ => new Array(101).fill(0));
var PATHFINDING = new EasyStar.js();
PATHFINDING.setGrid(grid);
CR.on(CR.hooks.update, stepAll);

var round0 = false;

function stepAll() {
    player.prestep();
    villagers.forEach(v => v.prestep());
    enemies.forEach(v => v.prestep());
    player.step();
    villagers.forEach(v => v.step());
    enemies.forEach(v => v.step());
    player.poststep();
    villagers.forEach(v => v.poststep());
    enemies.forEach(v => v.poststep());
    villagers = villagers.filter(v => !(v.state == "dead" && v.frame >= CONFIG.deadT));
    enemies = enemies.filter(v => !(v.state == "dead" && v.frame >= CONFIG.deadT));
    if (enemies.length === 0) {
        waveSize = waveSize * 1.5;
        if (round0) villagers_alive += villagers.length;
        round0 = true;
        for (var i = 0; i < waveSize; i++) {
            createEnemeY();
        }
    }
}
var waveSize = 5;

function createEnemeY() {

    let s = (2 * Math.round(Math.random()) - 1)
    new Enemy(s * width / 2 + 80 * s + s * Math.floor(waveSize / 10 * Math.random()) * 20, (Math.random() * height - height / 2) / 2 * 1.2, "normal");
}
for (let i = 0; i < 10; i++) {
    new Villager(300 * Math.cos(Math.TAU * i / 10), 300 * Math.sin(Math.TAU * i / 10), "normal");
}
new Building(0, -100, 80, 60, "hospital");

function showGameOverScreen(score) {
    document.getElementById("deathscreen").hidden = false;
    document.getElementById("score_enemykill").innerHTML = score;
    document.getElementById("score_villager").innerHTML = villagers_alive;
    throw `stop game`;
}