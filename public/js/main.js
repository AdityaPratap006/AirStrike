import Camera from './Camera.js';
import Timer from './Timer.js';
import { loadLevel } from './loaders/level.js';
import { createPlayerFighter } from './entities.js';
import { createCollisionLayer, createCameraLayer } from './layers.js';
import { setupKeyboard } from './input.js';
// import { setupMouseControl } from './debug.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise.all([
    createPlayerFighter(),
    loadLevel('1-1'),
])
.then(([ playerFighter, level, ]) => {

    const camera = new Camera();
    window.camera = camera;
    
    playerFighter.pos.set(100, 150);
    
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
        
        level.comp.draw(context, camera);

        
    }

    

    timer.start();
});

