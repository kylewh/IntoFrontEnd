const DOMUtil = {
  on: (element, eventType, selector, fn) => {
    element.addEventListener(eventType, e => {
      let el = e.target; // The original target is usually the innermost element
      while (!el.matches(selector)) {
        if (el === element) {
          //Query (silence) fail:  Reach the element itself => do nothing
          el = null;
          break;
        }
        el = el.parentNode;
      }
      el && fn.call(fn, e, el); // exp: element.onlick = (e, el) => { /* do sth ..*/}
    });
  },
  every: (nodeList, fn) => {
    nodeList.forEach((node, index) => {
      fn.call(null, node, index);
    });
  },
  index: element => {
    let index;
    element.parentNode.children.forEach((node, idx) => {
      index = node === element ? idx : -1;
    });
    return index;
  },
  append: (parent, children) => {
    children = typeof children.length === "undefined" ? [children] : children;
    children.forEach(node => parent.appendChild(node));
    return parent;
  },
  prepend: (parent, children) => {
    children = typeof children.length === "undefined" ? [children] : children;
    for (let i = children.length; i > 0; i--) {
      parent.firstChild
        ? parent.insertBefore(children[i])
        : parent.appendChild(children[i]);
    }
    return parent;
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
  create: (html, children) => {
    const tpl = document.createElement("template");
    tpl.innerHTML = html.trim(); // WARNING!: potential XSS danger, please make sure yor code is pure, and otherwise just sanitize it
    let node = tpl.content.firstChild;
    if (children) {
      DOMUtil.append(node, children);
    }
    return node;
  },
  removeChildren: element => {
    while (element.hasChildNodes()) {
      element.removeChild(element.lastChild);
    }
    return element;
  },
  uniqueClass: (element, className) => {
    dom.every(element.parentNode.children, el => {
      el.classList.remove(className);
    });
    element.classList.add(className);
    return element;
  }
};
