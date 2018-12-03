let CONFIG = {
    grabR: 20,
    throwR: 300,
    throwT: 60,
    throwHeight: 70,
    landT: 70,
    deadT: 90,
    player: {
        hp: 1,
        damage: 0,
        Iframes: 180,
        r: 25,
        speed: 4
    },
    enemy: {
        normal: {
            hp: 1,
            damage: 1,
            Iframes: 0,
            r: 25,
            speed: 0.6
        }
    },
    villager: {
        normal: {
            hp: 5,
            damage: 1,
            Iframes: 60,
            r: 25,
            speed: 0.4,
            fallDamage: 2
        }
    },
    building: {
        hospital: {
            treat(b,v){
                v.heal(3);
            },
            frames: 250,
            exitpos: new CR.Vector.Vector2(0,80)
        }
    }
};