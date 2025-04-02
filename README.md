# bible-abbreviation

[![npm version](https://badge.fury.io/js/bible-abbreviation.svg)](https://www.npmjs.com/package/bible-abbreviation)

Easily obtain the universal identifiers and full names of the books of the Bible in a variety of formats and languages.

## Table of Contents

-   [Installation](#installation)
-   [Usage](#usage)
    -   [Get universal book tag](#first-feature)
    -   [Get title for a given book](#second-feature)
    -   [Error handling](#error-handling)
-   [Internationalization](#languages)
-   [Contribute](#contribute)
-   [License](#license)

<a name="installation"></a>

## ⚙️ Installation

```bash
npm install bible-abbreviation
```

<a name="usage"></a>

## 📑 Usage

The module export two item :

-   A ready to use instance of `Abbreviator` as default export
-   The `Abbreviator` class itself

Most of the time, you juste have to import the default export and use it. The class is designed so that parameters can be modified at any time, so it's' theoretically unnecessary to instantiate multiple `Abbreviator` objects, but if you need more than one instance you can import the class itself. Keep in mind that as each instance of `Abbreviator` loads a JSON file from the i18n folder, so it's strongly recommended not to instantiate multiple objects of the `Abbreviator` class for performance optimization reasons.

```js
import abbrv from "bible-abbreviation"; // for the ready to use instance
import { Abbreviator } from "bible-abbreviation"; // for the class itself
import abbrv, { Abbreviator } from "bible-abbreviation"; // for both
```

In the rest of the documentation, we will use the default export.

<a name="first-feature"></a>

### 1️⃣ Get universal tag for a given abbreviation

The first feature of the Abbreviator is the `getTag` method, which provides a universal code for a Bible book based on an abbreviation you give it:

```js
const matthewTag = abbrv.getTag("Matthew");
console.log(matthewTag); // output : 'MT'
```

This method supports a very wide variety of abbreviations, for example `MT` will be returned for the following values: `matthieu, mt, matt, mat, matthew`. You can view all the supported abbreviations per book in the file [`canonAbbrv.json`](https://github.com/ryan-hmd/bible-abbreviation/blob/master/static/canonAbbrv.json).

<a name="second-feature"></a>

### 2️⃣ Generate a title for a given book

The second feature of this module is the `getTitle` method, which generates a title **in a given language and format**, for a book given as a parameter:

```js
const matthewTitle = abbrv.getTitle("Matt");
console.log(matthewTitle); // output : 'Matthew'
```

By default, the Abbreviator is set to English, but **you can also directly instantiate the object with the language of your choice** from among those available (see [Internationalization](#languages) section) by giving the constructor the identifier of the desired language.

```js
// abbreviator in french
const matthewTitle = abbrv.getTitle("Matt");
console.log(matthewTitle); // output : 'Matthieu'
```

You can of course **change the language at any time** by using the `setLang` method on the instantiated object.

```js
import abbrv from "bible-abbreviation"; // abbrv in english by default
abbrv.setLang("fr"); // abbrv is now in french
```

For those who need to use the constructor, you instantiate directly with the language of your choice (english will be used if nothing is specified) :

```js
import { Abbreviator } from "bible-abbreviation";
const abbrv = new Abbreviator("fr"); // instantiated in french
abbrv.setLang("en"); // abbrv is now in english
```

By default, the title format is set to `short`, but **you can set the default format** to `long`, `short` or `tiny` at any time according to your preference using the `setSize` method:

```js
abbrv.setSize("long"); // abbrv's title size are now set to 'long'
const matthewTitle = abbrv.getTitle("Matt");
console.log(matthewTitle); // output : Gospel according to Matthew
```

Of course, you can chain these methods for better readability :

```js
const matthewTitle = abbrv.setSize("long").getTitle("Matt"); // abbrv's title size are now persistantly set to 'long' and we return a result in this size
console.log(matthewTitle); // output : Gospel according to Matthew
```

Here's the different available formats

-   `long` — Detailed title (ex: Mt → _Gospel according to Matthew_)
-   `short` — Short book title (ex: 2 _Thess → 2 Thessalonians_)
-   `tiny` — Abbréviation standard (ex: _Genesis → Gn_)

You can also access a particular format **without having to change the default value persistantly** by providing the desired size as the second parameter of the `getTitle` function:

```js
abbrv.setSize("long"); // abbrv's title size are now persistantly set to 'long'

let matthewTitle = abbrv.getTitle("Matt", "short"); // return a short title even if you set size to long because you explicitly asked for a short size here
console.log(matthewTitle); // output : "Matthew"

matthewTitle = abbrv.getTitle("Matthew"); // no explicit format here so the method return the title with the default size
console.log(matthewTitle); // output : Gospel according to Matthew
```

<a name="error-handling"></a>

### ⚡ Error handling

For a better user experience, the `Abbreviator` class methods don't throw any exceptions. The `getTag` and `getTitle` methods will return `null` if the book provided as a parameter does not exist. For `getTitle`, if the given format is unknown, the default parameter previously defined (by the constructor or by you) will be used. In the same way, for `setSize` and `setLang`, if the respective parameters provided are not supported, the default parameters will be reset to their initial values, `short` and `en` respectively. Finally, to optimize loading of i18n data, if you try to set the language to the same value as the current one, the class will detect it and will not make any changes.

<a name="languages"></a>

## 🌍 Internationalization

English and French are the only two languages supported at the moment. We'll be working on integrating other languages in the future, but if you'd like to see a language available on the module quickly, please open a PR on our [Github](https://github.com/ryan-hmd/bible-abbreviation/pulls).

<a name="contribute"></a>

## 💻 Contribute

**Want to improve the module?** submit a [pull-request](https://github.com/ryan-hmd/bible-abbreviation/pulls) on github or open an [issue](https://github.com/ryan-hmd/abbreviation/issues).

<a name="license"></a>

## 📜 License

Copyright © 2023 [RyanHmd](https://github.com/ryan-hmd)
<br>
This project is MIT licensed.
