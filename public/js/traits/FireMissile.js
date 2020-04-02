import { Trait } from '../Entity.js';

export class FireMissile extends Trait {
    constructor(level, entityFactory) {
        super('fireMissile');

        this.spawnTimeout = 0;
        this.shouldFireMissile = false;
        this.level = level;
        this.entityFactory = entityFactory;
    }

    fireMissile() {
        this.shouldFireMissile = true;
    }

    cancelMissileFire() {
        this.shouldFireMissile = false;
    }

    obstruct() {

    }

    update(firingEntity, deltaTime) {
        if ( this.spawnTimeout > 0.5 && this.shouldFireMissile ) {
            const missile = this.entityFactory.missile();
            missile.pos.x = firingEntity.pos.x;
            missile.pos.y = firingEntity.pos.y + 25;
            
            this.level.entities.add(missile);
            this.spawnTimeout = 0;
            this.shouldFireMissile = false;
        }

        this.spawnTimeout += deltaTime;
    }

}

