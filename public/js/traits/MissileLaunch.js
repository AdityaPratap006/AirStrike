import { Trait } from '../Entity.js';

export default class MissileLaunch extends Trait {
    constructor() {
        super('missileLaunch');

        this.direction = 1;
        this.speed = 2000;
        this.isObstructed = false;
        this.maxRange = 128*15;
     
    }

    obstruct(entity) {
        this.isObstructed = true;
    }

    passedMaxRange(entity, firingPosition) {
        return (entity.pos.x - firingPosition) > this.maxRange;
    }

    update(entity, deltaTime) {

         
        if(this.isObstructed === true) {
            entity.vel.x = 0;
            entity.vel.y = 0;
            return;
        }

     
    
        entity.vel.x = Math.floor((this.speed * this.direction));

    }
}