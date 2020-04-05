import Compositor from "./Compositor.js";
import TileCollider from "./TileCollider.js";
import EntityCollider from "./EntityCollider.js";

export default class Level {
    constructor() {
        this.gravity = 800;
        this.totalTime = 0;
        this.comp = new Compositor();
        this.entities = new Set();
        this.tileCollider = null;
        this.entityCollider = new EntityCollider(this.entities);
    }

    setCollisionGrid(matrix) {
        this.tileCollider = new TileCollider(matrix);
    }

    update(gameContext) {
        const { deltaTime } = gameContext;
        
        this.entities.forEach(entity => {
            entity.update(gameContext);

            entity.pos.x +=  entity.vel.x * deltaTime;
            if (entity.canCollide) {
                this.tileCollider.checkX(entity);
            }
            
            entity.pos.y +=  entity.vel.y * deltaTime;
            if (entity.canCollide) {
                this.tileCollider.checkY(entity);
            }

            // entity.vel.y += this.gravity * deltaTime;
        });

        this.entities.forEach(entity => {
            if (entity.canCollide) {
                this.entityCollider.check(entity);
            }
        });


        this.totalTime += deltaTime;
    }
}
