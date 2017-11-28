/**
 * Created by zhiyong on 12/21/16.
 */
import {isMovingEnd} from '../env/environment';
import {addClassName} from '../dom/className'

export function handleHover() {
    if(isMovingEnd()){
        addClassName(document.querySelector('html'),'no-touch')
    }
}

export default {
    handleHover
};
