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


     // const arrowRight = 'ArrowRight';
    // input.addMapping(arrowRight, keyState => {
    //     if(keyState) {
    //         playerFighter.accelerate.start();
    //     }
    //     else{
    //         playerFighter.accelerate.cancel();
    //     }
    // });

    
    // const arrowLeft = 'ArrowLeft';
    // input.addMapping(arrowLeft, keyState => {
    //     if(keyState) {
    //         playerFighter.decelerate.start();
    //     }
    //     else{
    //         playerFighter.decelerate.cancel();
    //     }
    // });

    return input;
}