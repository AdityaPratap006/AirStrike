import Camera from './Camera.js';
import Timer from './Timer.js';
import { createLevelLoader } from './loaders/level.js';

import { loadEntities } from './entities.js';

import { createCollisionLayer, createCameraLayer } from './layers.js';
import { setupKeyboard } from './input.js';
import { FireMissile } from './traits/FireMissile.js';
// import { setupMouseControl } from './debug.js';


async function main(canvas) {
    const context = canvas.getContext('2d');

    const entityFactory = await loadEntities();
    const loadLevel = await createLevelLoader(entityFactory);

    const level = await loadLevel('1-1');

    const camera = new Camera();

    level.comp.layers.push(createCollisionLayer(level));
    level.comp.layers.push(createCameraLayer(camera));
    
    const playerFighter = entityFactory.playerFighter();
    playerFighter.pos.set(40, 150);

    //fire missiles
    playerFighter.addTrait(new FireMissile(level, entityFactory));
    
    level.entities.add(playerFighter);
    

    const input = setupKeyboard(playerFighter);
    input.listenTo(window);

    // setupMouseControl(canvas, playerFighter, camera);


    const timer = new Timer(1/60);

    function showAircraftOrMissileExplosion(entity) {
        const aircraftExplosion = entityFactory.aircraftExplosion();

        aircraftExplosion.pos.set(entity.pos.x + 50, entity.pos.y - 60);

        level.entities.add(aircraftExplosion);
        setTimeout(() => {
            level.entities.delete(aircraftExplosion);
        }, 400);    
    }

    timer.update =  function update(deltaTime) { 
        level.update(deltaTime);

        if (playerFighter.pos.x > 100 ) {
            camera.pos.x = playerFighter.pos.x - 100;
        }

        if(playerFighter.pos.x > 128*1600) {
            camera.pos.x = 128*1600; 
        }

        level.entities.forEach(entity => {
            if (entity.go && (entity.go.isObstructed || entity.killable.dead)) {
                level.entities.delete(entity);
                showAircraftOrMissileExplosion(entity);
            }

            if (entity.missileLaunch && (entity.missileLaunch.isObstructed || entity.killable.dead)) {
                level.entities.delete(entity);
                showAircraftOrMissileExplosion(entity);
            }

            if (entity.missileLaunch &&  entity.missileLaunch.passedMaxRange(entity, playerFighter.pos.x)) {
                level.entities.delete(entity);
                 
            }
            
            if(entity.enemyAircraft && entity.killable.dead) {
                level.entities.delete(entity);
                showAircraftOrMissileExplosion(entity);
            }


        });

        level.comp.draw(context, camera);        
    }

    timer.start();

}


const canvas = document.getElementById('screen');

main(canvas);