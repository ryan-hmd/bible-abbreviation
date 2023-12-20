# bible-abbreviation

[![npm version](https://badge.fury.io/js/bible-abbreviation.svg)](https://www.npmjs.com/package/bible-abbreviation)

Easily obtain the universal identifiers and full names of the books of the Bible in a variety of formats and languages.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Functions](#functions)
* [Todos](#todos)
* [License](#license)


<a name="installation"></a>
## ⚙️ Installation

Use npm to install :

```bash
npm install bible-abbreviation
```

<a name="usage"></a>
## 📑 Usage

Import the desired functions into your files :

```js
const { bookTag, bookTitle } = require('bible-abbreviation');
```

<a name="functions"></a>
## 📝 Functions
The module provides two functions for the moment, see the documentation for each below.

### `bookTag`
Returns a universal abbreviation for the requested book if it exists, return `null` if not. 
Supported abbreviations can be found in the `canonAbbrv.json` file.

Example :

```javascript
const abbreviation = bookTag('Genesis');
console.log(abbreviation); // Output: "GN"
```

| Parameter |   Type   | Required ? | Description                                                                   |
|:---------:|:--------:|:----------:|:-----------------------------------------------------------------------------:|
|  `abbrv`  | `string` |     yes    | The book you want to get the code. Must be contain in `canonAbbrv.json` file. |

💡 **Forgot an abbreviation?** Add it and submit a [pull-request](https://github.com/ryan-hmd/bible-abbreviation/pulls) on github or open an [issue](https://github.com/ryan-hmd/bible-abbreviation/issues).

### `bookTitle`
Returns a title for the requested book if it exists, in one of the following three formats:
- `long` - Detailed title (e.g. Mt → Évangile selon saint Matthieu)
- `short` - Abbreviated book title (e.g. 2 Th → 2 Thessaloniciens)
- `tiny` - Standard abbreviation (eg: Genèse → Gn)

Examples :
```js
const defaultTitle = bookTitle('Gn');
const longTitle = bookTitle('Gn', 'long');
const tinyTitle = bookTitle('Genesis', 'tiny');
console.log(defaultTitle); // Output: "Génèse"
console.log(longTitle); // Output: "Livre de la Genèse"
console.log(tinyTitle); // Output: "Gn"
```

| Parameter |   Type   | Required ? | Description                                                                   |
|:---------:|:--------:|:----------:|:-----------------------------------------------------------------------------:|
|   `book`  | `string` |     yes    | The book you want to get the title. |
|   `size`  | `string` |      no    | The format of the title. See availables one above. Default size is `short`. |

⚠️ **Only French is supported for the moment**, other languages are coming soon.

## 📋 Todos
- [ ] Add English language support.
- [ ] Extend supported canon to Orthodox deuterocanonical books

## 📜 License
Copyright © 2023 [RyanHmd](https://github.com/ryan-hmd)
This project is MIT licensed.