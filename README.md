# JS Helper Library

A lightweight, modular collection of helper functions written in Vanilla JavaScript.  
The goal is to bring just enough utility to your project: no external libraries, no bloat.

## 📁 Project Structure

```
js-helper-library/
├── extensions/ → Native object extensions (e.g., Array.prototype)
│   └── array.js
│
├── helpers/ → Standalone utility functions
│   └── utilities.js → General-purpose small helpers
│
├── jeQuery/ → just-enough-Query modules
│   ├── dom-helper.js → S(), C(), div(), p(), appendTo(), addExtensions()
│   ├── mini-wrapper.js →
│   └── prototype-booster.js →
│
├── modules/ → Self-contained modules
│   └── service-call.js → API/fetch helpers
│
├── README.md
├── .editorconfig *
├── .prettierrc *
├── .prettierignore *
└── .gitignore
```

## 🚀 Usage

```js
import './extensions/array.js';

const nums = [1, 2, 2, 3];
console.log(nums.unique().first()); // [1, 2, 3] → 1

import { C, S, div, p } from './helpers/dom-helper.js';

const main = C('div').addClass('box').attr('id', 'main').appendTo(document.body);

S('#main').append(p().text('Hello World'));
```

> Note: Files like array.js extend global prototypes. Make sure to import them only once.

## 🎯 Goals

Minimal and extensible
Fully compatible with modern browsers
Zero dependencies
"Just enough jQuery" philosophy

## 🤝 Contributing

> Suggestions and new modules are welcome — but please keep things small, simple, and focused.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
