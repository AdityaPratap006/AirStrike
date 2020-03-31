import { Trait } from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('go');

        this.direction = 0;
        this.acceleration = 500;
        this.dragFactor = 1/500000000;
    }

    update(entity, deltaTime) {
        
        if(entity.collided === true) {
            entity.vel.x = 0;
            entity.vel.y = 0;
        }
         
        if (entity.vel.x > 2400) {
            entity.vel.x = 2400;
            return;
        }

        if(entity.vel.x < 800) {
            entity.vel.x = 800;
            return;
        }

        // const drag = entity.vel.x >= 800 ? this.dragFactor * Math.abs(entity.vel.x/100) : 0;
        entity.vel.x += Math.floor((this.acceleration * this.direction * deltaTime));

       
    }
}