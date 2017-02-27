define(function (require, exports, module) {
    var count = 0;

    function render(str, className) {
        var node = document.createElement('p');
        count++;
        node.className = className;
        node.innerHTML += '<span class="count">' + count + ': ' + '</span>';
        node.innerHTML += str;
        document.getElementById('log').appendChild(node);
    }
    module.exports = render;
});