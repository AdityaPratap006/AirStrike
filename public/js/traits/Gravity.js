import { Trait } from '../Entity.js';

export default class Gravity extends Trait {
    constructor() {
        super('gravity');

        this.gravity = 3000;

        this.isObstructed = false;
    }

    obstruct(entity) {
        entity.vel.x = 0;
        entity.vel.y = 0;
        this.isObstructed = true;
    }

    update(entity, gameContext) {
        
        const { deltaTime } = gameContext;
         
        if(this.isObstructed === true) {
            entity.vel.x = 0;
            entity.vel.y = 0;
            return;
        }

        entity.vel.y += Math.floor((this.gravity  * deltaTime));

    }
}