var testObj = {'normal': 'normal'}

// writable 数据是否
Object.defineProperty(testObj, 'notWritebale', {
  writable: false,
  value: 99
})

var giveMeOneHundred = testObj.notWritebale++
console.log(testObj.notWritebale)
// "use strict" 严格模式下会报错 
// "Cannot assign to read only property 'notWritebale' of object '#<Object>'"
console.log(giveMeOneHundred = testObj.notWritebale++)
console.log( delete testObj )
console.log( 'notWritebale' in testObj )
console.log( 'a' in testObj )
for (let keys in testObj) {
  console.log(keys)
}

var thisContext = {
  context: 99,
  getContext: () => this.context
}
console.log(thisContext.getContext)