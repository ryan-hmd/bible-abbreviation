# bible-abbreviation

[![npm version](https://badge.fury.io/js/bible-abbreviation.svg)](https://www.npmjs.com/package/bible-abbreviation)

Easily obtain the universal identifiers and full names of the books of the Bible in a variety of formats and languages.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
    * [Get universal book tag](#first-feature)
    * [Get title for a given book](#second-feature)
* [Languages](#languages)
* [Notes](#notes)
* [Contribute](#contribute)
* [License](#license)


<a name="installation"></a>
## ⚙️ Installation

```bash
npm install bible-abbreviation
```

<a name="usage"></a>
## 📑 Usage

```js
const { Abbreviator } = require('bible-abbreviation');
const abbrv = new Abbreviator();
```

<a name="first-feature"></a>
### 1️⃣ Get universal tag for a given abbreviation

The first feature of the Abbreviator is the `getTag` method, which provides a universal code for a Bible book based on an abbreviation you give it:

```js
const abbrv = new Abbreviator();
const matthewTag = abbrv.getTag('Matthew');
console.log(matthewTag); // output : 'MT'
```

This method supports a very wide variety of abbreviations, for example `MT` will be returned for the following values: `matthieu, mt, matt, mat, matthew`. You can view all the supported abbreviations per book in the file [`canonAbbrv.json`](https://github.com/ryan-hmd/bible-abbreviation/blob/master/static/canonAbbrv.json).

<a name="second-feature"></a>
### 2️⃣ Generate a title for a given book

The second feature of this module is the `getTitle` method, which generates a title **in a given language and format**, for a book given as a parameter:

```js
const abbrv = new Abbreviator();
const matthewTitle = abbrv.getTag('Matt');
console.log(matthewTitle); // output : 'Matthew'
```

By default, the Abbreviator is set to English, but **you can also directly instantiate the object with the language of your choice** from among those available (see [Internationalization](#languages) section) by giving the constructor the identifier of the desired language.

```js
// abbreviator in french
const abbrv = new Abbreviator('fr');
const matthewTitle = abbrv.getTag('Matt');
console.log(matthewTitle); // output : 'Matthieu'
```

You can of course **change the language at any time** by using the `setLang` method on the instantiated object.

```js
const abbrv = new Abbreviator(); // abbrv in english
abbrv.setLang('fr'); // abbrv is now in french
```

By default, the title format is set to `short`, but **you can set the default format** to `long`, `short` or `tiny` at any time according to your preference using the `setSize` method:

```js
const abbrv = new Abbreviator();
abbrv.setSize('long'); // abbrv's title size are now set to 'long'
const matthewTitle = abbrv.getTitle('Matt');
console.log(matthewTitle) // output : Gospel according to Matthew
```

Here's the different available formats
- `long` — Detailed title (ex: Mt → *Gospel according to Matthew*)
- `short` — Short book title (ex: 2 *Thess → 2 Thessalonians*)
- `tiny` — Abbréviation standard (ex: *Genesis → Gn*)

You can also **access a particular format without having to change the default value** by providing the desired size as the second parameter of the `getTitle` function:

```js
const abbrv = new Abbreviator();
abbrv.setSize('long'); // abbrv's title size are now set to 'long'

let matthewTitle = abbrv.getTitle('Matt', 'short'); // return a short title even if you set size to long because you explicitly asked for a short size here
console.log(matthewTitle) // output : "Matthew"

matthewTitle = abbrv.getTitle('Matthew'); // no explicit format here so the method return the title with the default size
console.log(matthewTitle) // output : Gospel according to Matthew
```

<a name="languages"></a>
## 🌍 Internationalization

English and French are the only two languages supported at the moment. We'll be working on integrating other languages in the future, but if you'd like to see a language available on the module quickly, please open a PR on our [Github](https://github.com/ryan-hmd/bible-ref-parser/pulls).

<a name="notes"></a>
## ❓ Notes

As the class is designed so that parameters can be modified at any time, it is theoretically unnecessary to instantiate multiple `Abbreviator` objects. As each instance of `Abbreviator` loads a JSON file in the corresponding language, it is strongly recommended not to instantiate multiple objects of the `Abbreviator` class for performance optimization reasons.

We're working on a new structure for the i18n internationalization folder to optimize data loading. This improvement is not a high priority, since the module currently supports only two languages, but the release of this optimization will be backward-compatible.

<a name="contribute"></a>
## 💻 Contribute

**Want to improve the module?** submit a [pull-request](https://github.com/ryan-hmd/bible-abbreviation/pulls) on github or open an [issue](https://github.com/ryan-hmd/abbreviation/issues). 

<a name="license"></a>
## 📜 License

Copyright © 2023 [RyanHmd](https://github.com/ryan-hmd)
<br>
This project is MIT licensed.