import { readFileSync } from "fs";
import unidecode from "unidecode";
import canonAbbrv from "../static/canonAbbrv.json";

class Abbreviator {
    #lang: Lang = "en";
    #size: Size = "short";
    #translations: BookTitleMap = {};

    constructor(language: Lang = "en") {
        this.setLang(language);
    }

    get lang() {
        return this.#lang;
    }

    get size() {
        return this.#size;
    }

    /**
     * Loads the translations from the `i18n` folder based on the current language.
     */
    #loadTranslations() {
        try {
            const translationFile = readFileSync(
                `../static/i18n/${this.#lang}.json`,
                "utf8"
            );
            this.#translations = JSON.parse(translationFile);
        } catch (error) {
            console.error(
                `Error loading translations for ${this.#lang}: ${error}`
            );
            this.#translations = {};
        }
    }

    /**
     * Set the default language for titles. Constructor set the default language to `en`.
     *
     * Below the supported languages :
     * - English : `en` or `english`
     * - French : `fr` or `french`
     */
    setLang(language: Lang) {
        let newLang: Lang;
        switch (language.toLowerCase()) {
            case "fr":
                newLang = "fr";
                break;
            default:
                newLang = "en";
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
    setSize(size: Size) {
        switch (size.toLowerCase()) {
            case "long":
                this.#size = "long";
                break;
            case "tiny":
                this.#size = "tiny";
                break;
            default:
                this.#size = "short";
        }
        return this;
    }

    /**
     * Returns a universal API abbreviation for the requested book if it exists.
     * - Supported abbreviations are available in the `canonAbbrv.json` file.
     */
    getTag(abbrv: string) {
        if (!abbrv) return null;
        const match = unidecode(abbrv.toLowerCase().replace(/ /g, ""));
        return (
            Object.keys(canonAbbrv).find((book) =>
                canonAbbrv[book as keyof typeof canonAbbrv]?.includes(match)
            ) || null
        );
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
    getTitle(book: string, size?: Size) {
        const tag = this.getTag(book);
        if (!tag) return null;
        switch (size?.toLowerCase()) {
            case "short":
                return this.#translations[tag].short;
            case "long":
                return this.#translations[tag].long;
            case "tiny":
                return this.#translations[tag].tiny;
            default:
                return this.#translations[tag][this.#size];
        }
    }
}

export { Abbreviator };
export default new Abbreviator();
