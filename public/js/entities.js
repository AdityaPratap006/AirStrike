import { loadPlayerFighter } from './entities/playerFighter.js';
import { loadAircraftExplosion } from './entities/aircraftExplosion.js';
import { loadMissile } from './entities/missile.js';
import { loadEnemyFighter } from './entities/enemyFighter.js';
import { loadBomb } from './entities/bomb.js';
import { loadBombExplosion } from './entities/bombExplosion.js';
import { loadTank } from './entities/tank.js';

export async function loadEntities() {

    const entityFactories = {};

    function addAs(name) {
        return factory => entityFactories[name] = factory;
    }

    return Promise.all([
        loadPlayerFighter().then(addAs('playerFighter')),
        loadAircraftExplosion().then(addAs('aircraftExplosion')),
        loadMissile().then(addAs('missile')),
        loadEnemyFighter().then(addAs('enemyFighter')),
        loadBomb().then(addAs('bomb')),
        loadBombExplosion().then(addAs('bombExplosion')),
        loadTank().then(addAs('tank')),
    ])
    .then(() => entityFactories);
}