const fs = require('fs');
const path = require('path');
const unidecode = require('unidecode');
const canonAbbrv = require('../static/canonAbbrv.json');

export class Abbreviator {
    #lang: string = '';
    #size: "long" | "short" | "tiny" = "short";
    #translations: BookTitleMap = {};

    constructor(language='en_US') {
        this.setLang(language);
    }

    get lang() {
        return this.#lang;
    }

    get size() {
        return this.#size;
    }

    // LOADER of translation from i18n repository
    #loadTranslations() {
        try {
            const i18nFilePath = path.resolve(__dirname, `../static/i18n/${this.#lang}.json`);
            const translationFile = fs.readFileSync(i18nFilePath, 'utf8');
            this.#translations = JSON.parse(translationFile);
        } catch (error) {
            console.error(`Error loading translations for ${this.#lang}: ${error}`);
            this.#translations = {};
        }
    }

    /**
     * Set the default language for titles. Constructor set the default language to `en_US`.
     * 
     * Below the supported languages :
     * - English : `en` or `english`
     * - French : `fr` or `french`
     */
    setLang(language: string) {
        let newLang;
        switch(language.toLowerCase()) {
            case 'fr':
            case 'french':
                newLang = 'fr_FR';
                break;
            default:
                newLang = 'en_US';
        }
        if (newLang !== this.#lang) {
            this.#lang = newLang;
            this.#loadTranslations();
        }
        return this;
    }

    /**
     * Set the default size for title.
     * Constructor set the default value to `short`.
     */
    setSize(size: string) {
        switch(size.toLowerCase()) {
            case 'long':
                this.#size = 'long';
                break;
            case 'tiny':
                this.#size = 'tiny';
                break;
            default:
                this.#size = 'short';
        }
        return this;
    }

    /**
     * Returns a universal API abbreviation for the requested book if it exists.
     * - Supported abbreviations are available in the `canonAbbrv.json` file.
     */
    getTag(abbrv: string) {
        if (!abbrv) return null;
        const match = unidecode(abbrv.toLowerCase().replace(/ /g, ''));
        return Object.keys(canonAbbrv)
            .find(book => canonAbbrv[book].includes(match))
            || null;
    }

    /**
     * Returns a title for the requested book if it exists in one of the three following formats (`short` by default):
     * - `long` — Detailed title (ex: Mt → Gospel according to Matthew)
     * - `short` — Short book title (ex: 2 Thess → 2 Thessalonians)
     * - `tiny` — Abbréviation standard (ex: Genesis → Gn)
     * 
     * Checkout the `setSize` method to persistantly set the default size to what you want.
     * If you just want a different size for one time, you can set the parameter size to what you want, it won't change the default value.
     */
    getTitle(book: string, size: string = "") {
        const tag = this.getTag(book);
        if (!tag) return null;
        switch(size.toLowerCase()) {
            case 'long':
                return this.#translations[tag].long;
            case 'tiny':
                return this.#translations[tag].tiny;
            case 'short':
                return this.#translations[tag].short;
            default:
                return this.#translations[tag][this.#size];
        }
    }
}