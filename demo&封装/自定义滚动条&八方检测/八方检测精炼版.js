let obj = document.getElementById("box");
let checkTable = {
  Top: ['height', 'offsetY', 'n', 0, false, 'Y', 'offsetTop', 'Height', 1],
  Bottom: ['height', 'offsetY', 's', 1, false, 'Y', 'offsetTop', 'Height', 0],
  Right: ['width', 'offsetX', 'e', 1, false, 'X', 'offsetLeft', 'Width', 0],
  Left: ['width', 'offsetX', 'w', 0, false, 'X', 'offsetLeft', 'Width', 0]
}
let dirTable = {
  n: 'ns',
  s: 'ns',
  e: 'ew',
  w: 'ew',
  ne: 'nesw',
  sw: 'nesw',
  nw: 'nwse',
  se: 'nwse'
};
obj.addEventListener('mousemove', mouseActivator);

function mouseActivator(e) {
  let dir = '',
    rect = obj.getBoundingClientRect();
  for (let key in checkTable) {
    if (Math.abs(checkTable[key][3] * rect[checkTable[key][0]] - e[checkTable[key][1]]) < 5) {
      dir += checkTable[key][2];
      checkTable[key][4] = true;
    }
  }
  obj.style.cursor = dirTable[dir] ? dirTable[dir] + '-resize ' : 'auto';
}