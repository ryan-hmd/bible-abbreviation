const unidecode = require('unidecode');
const canonAbbrv: CanonAbbrv = require('../static/canonAbbrv.json');
const bookName: BookTitleMap = require('../static/bookName.json');

/**
 * Returns a universal API abbreviation for the requested book if it exists.
 * - Supported abbreviations are available in the `canonAbbrv.json` file.
 */
export const bookTag = (abbrv: string) => {
    const match = unidecode(abbrv.toLowerCase().replace(/ /g, ''));
    return Object.keys(canonAbbrv)
        .find(book => canonAbbrv[book].includes(match))
        || null;
}

/**
 * Returns a title for the requested book if it exists in one of the three following formats (`short` by default):
 * - `long` — Detailed title (ex: Mt → Evangile selon saint Matthieu)
 * - `short` — Short book title (ex: 2 Th → 2 Thessaloniciens)
 * - `tiny` — Abbréviation standard (ex: Génèse → Gn)
 */
export const bookTitle = (book: string, size: string = 'short') => {
    const tag = bookTag(book);
    if(!tag) return null;
    switch(size) {
        case 'long':
            return bookName[tag].long;
        case 'tiny':
            return bookName[tag].tiny;
        default:
            return bookName[tag].short;
    }
}
