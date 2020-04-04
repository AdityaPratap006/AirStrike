import Camera from './Camera.js';
import Timer from './Timer.js';
import { createLevelLoader } from './loaders/level.js';
import { createAudioLoader } from './loaders/audio.js';

import { loadEntities } from './entities.js';

import { createCollisionLayer } from './layers/collisionLayer.js';
import { createCameraLayer } from './layers/cameraLayer.js';

import { setupKeyboard } from './input.js';

import { FireMissile } from './traits/FireMissile.js';
// import { setupMouseControl } from './debug.js';

class AudioBoard {
    constructor(context) {
        this.context = context;
        this.buffers = new Map();
        
    }

    addAudio(name, buffer) {
        this.buffers.set(name, buffer);
    }

    playAudio(name) {

        const gainNode = this.context.createGain();
        gainNode.gain.value = 0.30;
        gainNode.connect(this.context.destination);

        const source = this.context.createBufferSource();
        
        source.buffer = this.buffers.get(name);
        source.start(0);
        source.connect(gainNode);
        
    }

    
    stopAudio(name) {
        const gainNode = this.context.createGain();
        gainNode.gain.value = 0.30;
        gainNode.connect(this.context.destination);

        const source = this.context.createBufferSource();
        
        source.buffer = this.buffers.get(name);
        source.stop();
        source.connect(gainNode);
    }

}


async function main(canvas) {

    const backgroundMusic = new Audio("../sounds/Uri BGM (Special Force).mp3");
    backgroundMusic.load();
    backgroundMusic.volume = 0.3;
    backgroundMusic.loop = true;
    backgroundMusic.play();
   
    

    const speedoMeter = document.getElementById('speedometer');
    const machMeter = document.getElementById('machmeter');

    const gameOverScreen = document.getElementById('GameOver');
    // gameOverScreen.classList.add('hide');

    let airTargetScore = 0;

    const context = canvas.getContext('2d');

    const entityFactory = await loadEntities();

    const audioContext =  new AudioContext();
    const audioBoard = new AudioBoard(audioContext);

    const loadAudio = createAudioLoader(audioContext);

    loadAudio("../sounds/missile.mp3")
    .then(buffer => {
        audioBoard.addAudio("missile", buffer);
         
    });

    loadAudio("../sounds/aircraftExplosion.mp3")
    .then(buffer => {
        audioBoard.addAudio("aircraftExplosion", buffer);
         
    });

     

    const loadLevel = createLevelLoader(entityFactory);

    const level = await loadLevel('1-1');

    const camera = new Camera();

    level.comp.layers.push(createCollisionLayer(level));
    level.comp.layers.push(createCameraLayer(camera));
    
    const playerFighter = entityFactory.playerFighter();
    playerFighter.pos.set(40, 128*3);

    //fire missiles
    playerFighter.addTrait(new FireMissile(level, entityFactory));
    
    level.entities.add(playerFighter);
    

    const input = setupKeyboard(playerFighter);
    input.listenTo(window);

    const gameContext = {
        audioBoard,
        deltaTime: null,
    }


    

    function showAircraftOrMissileExplosion(entity) {
        audioBoard.playAudio('aircraftExplosion');

        const aircraftExplosion = entityFactory.aircraftExplosion();

        aircraftExplosion.pos.set(entity.pos.x + 50, entity.pos.y - 60);

        level.entities.add(aircraftExplosion);
        setTimeout(() => {
            level.entities.delete(aircraftExplosion);
        }, 400);    
    }

    const timer = new Timer(1/60);
    timer.update =  function update(deltaTime) { 
        gameContext.deltaTime = deltaTime;
        level.update(gameContext);

        speedoMeter.textContent = `${playerFighter.vel.x} Km/h`;
        machMeter.textContent = ` MACH: ${(playerFighter.vel.x / 1235).toFixed(2)}`;

        // machMeter.textContent = ` supercruise maintained for: ${Math.floor(playerFighter.supercruise.maintainedFor())} sec`;

        if (playerFighter.pos.x > 100 ) {
            camera.pos.x = playerFighter.pos.x - 100;
        }

        if(playerFighter.pos.x > 128*1600) {
            camera.pos.x = 128*1600; 
        }

        level.entities.forEach(entity => {
            if (entity.go && (entity.go.isObstructed || entity.killable.dead)) {
                backgroundMusic.pause();

                const sadMusic = new Audio("../sounds/sad bgm.mp3");
                sadMusic.load();
                sadMusic.volume = 0.2;
                sadMusic.loop = true;
                sadMusic.play();

                entity.vel.set(0, 0);
                level.entities.delete(entity);
                showAircraftOrMissileExplosion(entity);

                gameOverScreen.classList.remove('hide');
                gameOverScreen.classList.add('show');

                const airScore = document.getElementById("airScore");
                airScore.innerText = `${airTargetScore}`;

                const superSonicScore = document.getElementById("superSonicScore");
                superSonicScore.innerText = `${Math.floor(playerFighter.supercruise.maintainedFor())} sec`;

                const restartBtn = document.getElementById("restart-btn");
                restartBtn.addEventListener('click', (e) => {
                    window.location.reload();
                })
            }

            if (entity.missileLaunch && (entity.missileLaunch.isObstructed || entity.killable.dead)) {
                level.entities.delete(entity);
                // showAircraftOrMissileExplosion(entity);
            }

            if (entity.missileLaunch &&  entity.missileLaunch.passedMaxRange(entity, playerFighter.pos.x)) {
                level.entities.delete(entity);
                 
            }
            
            if(entity.enemyAircraft ) {

                if (entity.killable.dead) {
                    level.entities.delete(entity);
                    showAircraftOrMissileExplosion(entity);
                    ++airTargetScore;
                }

                if(entity.pos.x - camera.pos.x < -100) {
                    level.entities.delete(entity);
                }
              
            }


        });

        level.comp.draw(context, camera);        
    }

    timer.start();

}


const canvas = document.getElementById('screen');


const dashboard = document.getElementById('Dashboard');
dashboard.addEventListener('click', (e) => {
    e.preventDefault();

    dashboard.parentElement.removeChild(dashboard);

    main(canvas);


});