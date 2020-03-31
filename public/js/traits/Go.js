import { Trait } from '../Entity.js';

export default class Go extends Trait {
    constructor() {
        super('go');

        this.direction = 0;
        this.acceleration = 2000;
    }

    update(entity, deltaTime) {
         
        if (entity.vel.x >= 1200) {
            entity.vel.x = 1100;
            return;
        }

        if(entity.vel.x < 0) {
            entity.vel.x = 0;
            return;
        }

        entity.vel.x += this.acceleration * this.direction * deltaTime;
    }
}