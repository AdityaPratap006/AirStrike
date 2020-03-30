import { Trait } from '../Entity.js';

export default class Deceleration extends Trait {
    constructor(deceleration) {
        super('decelerate');

        this.duration = 5000;
        this.engageTime = 0;
        this.deceleration = deceleration;
    }

    start() {
        this.engageTime = this.duration;
        
        
    }

    cancel(){
        this.engageTime = 0;
    }

    update(entity, deltaTime) {
        if( entity.vel.x <= 0 || entity.pos.x <= 0 ) {
            // entaity.vel.x = 0;
            return;
         }
        // entity.pos.x +=  entity.vel.x * deltaTime;

        if (this.engageTime > 0 &&  entity.vel.x >= 0 ) {
            if (entity.pos.x >=0 ){
                
                entity.vel.x -= this.deceleration * this.engageTime;
            }else{
                 entity.vel.x = 0;
                // entity.pos.x = 0;
            }
            this.engageTime -= deltaTime;
        }
    }
}
