import { Trait } from '../Entity.js';

export default class Velocity extends Trait {
    constructor() {
        super('velocity');
    }

    update(entity, deltaTime) {
        
         if (entity.vel.x >= 0 && entity.pos.x <= 1200) {
            entity.pos.x +=  entity.vel.x * deltaTime;
         }else if (entity.vel.x < 0 && entity.pos.x >= 100){
            entity.pos.x +=  entity.vel.x * deltaTime;
         }
        
         entity.pos.y +=  entity.vel.y * deltaTime;
        // if(entity.vel.x >= 0 && entity.pos.x <= 128*10) {

        //     entity.pos.x +=  entity.vel.x * deltaTime;
        // }
        // // else if (entity.vel.x <=0 && entity.pos.x >= 0) {

        // //     entity.pos.x +=  entity.vel.x * deltaTime;
        // // }

        // if (entity.pos.y <= 128*4) {
        //     entity.pos.y +=  entity.vel.y * deltaTime;
        // }
        
    }
}
