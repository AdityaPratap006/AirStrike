import Keyboard from './KeyboardStates.js';

export function setupKeyboard(entity) {
    const W = 'KeyW';
    const input = new Keyboard();
    input.addMapping(W, keyState => {
        entity.ascend.direction += keyState ? -1 : 1;
        if(keyState) {
            entity.ascend.start();
        }else{
            entity.ascend.cancel();
        }
    });

    const S = 'KeyS';
    input.addMapping(S, keyState => {
        entity.ascend.direction += keyState ? 1 : -1;
        if(keyState) {
            entity.ascend.start();
        }else{
            entity.ascend.cancel();
        }
    });

    const D = 'KeyD';
    input.addMapping(D, keyState => {
        entity.go.direction += keyState ? 1 : -1;
    });

    const A = 'KeyA';
    input.addMapping(A, keyState => {
        entity.go.direction += keyState ? -1 : 1;
    });


    const Numpad1 = 'Numpad1';
    input.addMapping(Numpad1, keyState => {
        if (keyState) {
            entity.fireMissile.fireMissile();
        }else {
            entity.fireMissile.cancelMissileFire();
        }

    });

    const Digit1 = 'Digit1';
    input.addMapping(Digit1, keyState => {
        if (keyState) {  
            entity.fireMissile.fireMissile();
        }else {
            entity.fireMissile.cancelMissileFire();
        }
    });

    const Numpad2 = 'Numpad2';
    input.addMapping(Numpad2, keyState => {
        if (keyState) {
            entity.dropBomb.dropBomb();
        }else {
            entity.dropBomb.cancelBombDrop();
        }
    });

    const Digit2 = 'Digit2';
    input.addMapping(Digit2, keyState => {
        if (keyState) {
            entity.dropBomb.dropBomb();
        }else {
            entity.dropBomb.cancelBombDrop();
        }
    });


    return input;
}