function fakeIterator(array) {
    var nextIdx = 0;
    return {
        next: function () {
            return nextIdx < array.length ? {
                value: array[nextIdx++],
                done: false
            } : {
                value: undefined,
                done: true
            }
        }
    };
}


var it = fakeIterator([1, 2, 3, 4, 5, 6]);

console.log( it.next() );
console.log( it.next() );
console.log( it.next() );
console.log( it.next() );
console.log( it.next() );
console.log( it.next() );
console.log( it.next() );

// for ( var key of it) {
//     console.log(key);
// }