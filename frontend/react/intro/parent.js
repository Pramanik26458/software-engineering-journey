
import box from'./app.js'
import circle  from './test.js';

const parent=()=>{
    return React.createElement('div',null,[box(),circle()])
}

export default parent;