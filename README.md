# BlockReady

[![NPM Version][npm-image]][npm-url]
[![NPM Downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/blockready.svg
[npm-url]: https://npmjs.org/package/blockready
[downloads-image]: https://img.shields.io/npm/dm/blockready.svg
[downloads-url]: https://npmjs.org/package/blockready

### What is this?

BlockReady is a JavaScript library which if needed, can initiate basic, modern looking styling for all elements. You won't have to worry about styling ever again. Just like in markdown? :D

The library also has callbacks for event listening. The syntax is very readable and easy to maintain.

This library extends on a sister-library integrated in it called: <a href="https://github.com/AneekRahman/jstyling">JStyling</a>. It's the easiest way to write CSS in JavaScript!

<p style="color: rgba(0,0,0,0.4)">Also help the development by reporting any bugs. Feel free to contribute to this project. Thanks ❤</p>

### Examples

### Benefits

- Readable syntax and scalable
- Extremely lightweight: Only 72kB (19kB gzipped)
- No dependency: It's all Pure javascript
- Just one blockready.js file. No CSS FILE REQUIRED!
- Choose from a theme library (coming soon...)

### CDN

```
<script src="https://unpkg.com/blockready/src/blockready.js">
```

### NPM Installation

```
npm i blockready
```

### Usage

```
import BR from 'blockready';

// Intiate all styles on all elements that BlockReady can style
BR().all();

// Do ONLY Styling on <p>
BR('p').style({})

// Do BOTH Styling + Callbacks on <p>
BR('p').make({
  style: {},
  onPressed: function(){}
  // ...
});
```

### Prebuilt Styles

```

```

#### Callbacks

```

```

### Make your own Elements!

### Future plans

This is a open source project. Any and all contributions are highly appreciated and required. If you like the idea please show your support!
