import { Trait } from '../Entity.js';

export class DropBomb extends Trait {
    constructor(level, entityFactory) {
        super('dropBomb');

        this.spawnTimeout = 0;
        this.shouldDropBomb = false;
        this.level = level;
        this.entityFactory = entityFactory;
    }

    dropBomb() {
        this.shouldDropBomb = true;
    }

    cancelBombDrop() {
        this.shouldDropBomb = false;
    }

    obstruct() {

    }

    update(firingEntity, gameContext) {

        const { deltaTime, audioBoard } = gameContext;
       
        if ( this.spawnTimeout > 0.5 && this.shouldDropBomb ) {

            if (firingEntity.vel.x > 2500) {
                this.cancelBombDrop();
                return;
            }

            for (let i=0; i<3; ++i) {
                const bomb = this.entityFactory.bomb();
                bomb.pos.x = firingEntity.pos.x + 75*i ;
                bomb.pos.y = firingEntity.pos.y + 30;
                bomb.vel.x = firingEntity.vel.x;
                this.level.entities.add(bomb);
            }
           
            
            // audioBoard.playAudio('bomb');

            
            this.spawnTimeout = 0;
            this.shouldDropBomb = false;
        }

        this.spawnTimeout += deltaTime;
    }

}

