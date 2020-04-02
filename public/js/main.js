import Camera from './Camera.js';
import Timer from './Timer.js';
import { loadLevel } from './loaders/level.js';
import { loadPlayerFighter } from './entities/playerFighter.js';
import { loadAircraftExplosion } from './entities/aircraftExplosion.js';
import { createCollisionLayer, createCameraLayer } from './layers.js';
import { setupKeyboard } from './input.js';
// import { setupMouseControl } from './debug.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise.all([
    loadPlayerFighter(),
    loadAircraftExplosion(),
    loadLevel('1-1'),
])
.then(([ createPlayerFighter, createAircraftExplosion, level, ]) => {

    const camera = new Camera();
    window.camera = camera;
    
    const playerFighter = createPlayerFighter();
    playerFighter.pos.set(100, 150);
    playerFighter.addTrait({
        NAME: 'fire',
        spawnTimeout: 0,
        shouldFireMissile: false,
        fireMissile() {
            this.shouldFireMissile = true;
        },
        cancelMissileFire() {
            this.shouldFireMissile = false;
        },
        obstruct() {

        },
        update(playerFighter, deltaTime) {
            if ( this.spawnTimeout > 0.5 && this.shouldFireMissile ) {
                const spawn = createPlayerFighter();
                spawn.pos.x = playerFighter.pos.x;
                spawn.pos.y = playerFighter.pos.y;
                spawn.vel.x = playerFighter.vel.x + 500;
                spawn.vel.y = 100;
                level.entities.add(spawn);
                this.spawnTimeout = 0;
                this.shouldFireMissile = false;
            }

            this.spawnTimeout += deltaTime;
        },
    })


    level.comp.layers.push(createCollisionLayer(level));
    level.comp.layers.push(createCameraLayer(camera));

    level.entities.add(playerFighter);
    
     

    const input = setupKeyboard(playerFighter);
    input.listenTo(window);

    // setupMouseControl(canvas, playerFighter, camera);

    const timer = new Timer(1/60);

    timer.update =  function update(deltaTime) { 
        level.update(deltaTime);

        if (playerFighter.pos.x > 200 ) {
            camera.pos.x = playerFighter.pos.x - 200;
        }

        level.entities.forEach(entity => {
            if (entity.go && entity.go.isObstructed) {
                level.entities.delete(entity);
                
                const aircraftExplosion = createAircraftExplosion();

                aircraftExplosion.pos.set(entity.pos.x + 50, entity.pos.y - 60);

                level.entities.add(aircraftExplosion);
                setTimeout(() => {
                    level.entities.delete(aircraftExplosion);
                }, 400);
            
                
            }
        });
        
        level.comp.draw(context, camera);

        
    }

    

    timer.start();
});

