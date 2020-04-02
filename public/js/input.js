import Keyboard from './KeyboardStates.js';

export function setupKeyboard(entity) {
    const W = 'KeyW';
    const input = new Keyboard();
    input.addMapping(W, keyState => {
        entity.ascend.direction += keyState ? -1 : 1;
        if(keyState) {
            entity.ascend.start();
        }
        else{
            entity.ascend.cancel();
        }
    });

    const S = 'KeyS';
    input.addMapping(S, keyState => {
        entity.ascend.direction += keyState ? 1 : -1;
        if(keyState) {
            entity.ascend.start();
        }
        else{
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
            console.log('fire missile!');
            entity.fireMissile.fireMissile();
        }

        // entity.fire.cancelMissileFire();
        
    })

    const Digit1 = 'Digit1';
    input.addMapping(Digit1, keyState => {
        if (keyState) {
            console.log('fire missile!');
            entity.fireMissile.fireMissile();
        }

        // entity.fire.cancelMissileFire();
    })


    return input;
}