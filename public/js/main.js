import Timer from './Timer.js';
import { loadLevel } from './loaders.js';
import { createPlayerFighter } from './entities.js';
import { createCollisionLayer } from './layers.js';
import { setupKeyboard } from './input.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');


Promise.all([
    createPlayerFighter(),
    loadLevel('1-1'),
])
.then(([ playerFighter, level, ]) => {
    
    playerFighter.pos.set(100, 100);
    // playerFighter.vel.set(0, 0);

    level.comp.layers.push(createCollisionLayer(level));

    level.entities.add(playerFighter);
    
    const input = setupKeyboard(playerFighter);
    input.listenTo(window);

    // ['mousedown', 'mousemove'].forEach(eventName => {
    //     canvas.addEventListener(eventName, event => {
    //         if (event.buttons === 1) {
              
    //             playerFighter.vel.set(0,0);
    //             playerFighter.pos.set(event.offsetX, event.offsetY);
    //         }
    //     })
    // })

    const timer = new Timer(1/60);

    timer.update =  function update(deltaTime) { 
        level.update(deltaTime);
        level.comp.draw(context);
    }

    timer.start();
});

