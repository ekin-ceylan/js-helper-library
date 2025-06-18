class Q {
  constructor(sel) {
    if (typeof sel === 'string') {
      this.nodes = [...document.querySelectorAll(sel)];
    } else if (sel instanceof Node) {
      this.nodes = [sel];
    } else {
      this.nodes = [...sel]; // assume NodeList, HTMLCollection or Array
    }
  }

  /* shared helpers — ONE copy in memory */
  addClass(...cls) {
    this.nodes.forEach(n => n.classList.add(...cls));
    return this;
  }

  attr(key, val) {
    if (val !== undefined) {
      this.nodes.forEach(n => n.setAttribute(key, val));
      return this;
    }

    return this.nodes[0]?.getAttribute(key);
  }

  /* helpers to exit the wrapper */
  get(idx = 0) { return this.nodes[idx]; }
  all()        { return this.nodes; }
}

/* shortcut that feels like jQuery */
const $ = sel => new Q(sel);
export default $;
