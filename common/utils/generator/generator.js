/**
 * Created by zhiyong on 6/16/17.
 */
function* helloGenerotor() {
  yield 'hello';
  yield  'world';
  return 'ending';
}

function* f() {
  for(var i=0; true; i++){
    var reset = yield i;
    if(reset) {i = -1;}
  }
}

export default {
  helloGenerotor,
  f
}
export {
  helloGenerotor,
  f
}

