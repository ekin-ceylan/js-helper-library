# JS Helper Library

A lightweight, modular collection of helper functions written in Vanilla JavaScript.  
The goal is to bring just enough utility to your project — no external libraries, no bloat.

## 📁 Project Structure


## 🚀 Usage

```js
import './extensions/array.js';

const nums = [1, 2, 2, 3];
console.log(nums.unique().first()); // [1, 2, 3] → 1

import { £, $ } from './helpers/dom-helper.js';

£('div')
  .addClass('box')
  .attr('id', 'main')
  .appendTo(document.body);
```

Note: Files like array.js extend global prototypes. Make sure to import them only once.

🎯 Goals

    Minimal and extensible

    Fully compatible with modern browsers

    Zero dependencies

    "Just enough jQuery" philosophy

🤝 Contributing

Suggestions and new modules are welcome — but please keep things small, simple, and focused.
