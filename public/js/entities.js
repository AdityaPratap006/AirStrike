import { loadPlayerFighter } from './entities/playerFighter.js';
import { loadAircraftExplosion } from './entities/aircraftExplosion.js';
import { loadMissile } from './entities/missile.js';
import { loadEnemyFighter } from './entities/enemyFighter.js';

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
    ])
    .then(() => entityFactories);
}