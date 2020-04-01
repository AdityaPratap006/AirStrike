import { Trait } from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('go');

        this.direction = 0;
        this.acceleration = 500;
        this.dragFactor = 1/500000000;

        this.isObstructed = false;
    }

    obstruct(entity) {
        this.isObstructed = true;
    }

    update(entity, deltaTime) {
         
        console.log(entity.vel.x);
        if(this.isObstructed === true) {
            entity.vel.x = 0;
            entity.vel.y = 0;
            return;
        }

        if(entity.pos.x >= 128*1998) {
            entity.vel.x = 0;
            entity.vel.y = 0;
            return;
        }
         
        if (entity.vel.x > 2400) {
            entity.vel.x = 2400;
            return;
        }

        if(entity.vel.x < 500) {
            entity.vel.x = 500;
            return;
        }

        // const drag = entity.vel.x >= 800 ? this.dragFactor * Math.abs(entity.vel.x/100) : 0;
        entity.vel.x += Math.floor((this.acceleration * this.direction * deltaTime));

        // this.isObstructed = false;
    }
}