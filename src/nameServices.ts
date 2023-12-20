const unidecode = require('unidecode');
const canonAbbrv: CanonAbbrv = require('../static/canonAbbrv.json');
const bookName: BookTitleMap = require('../static/bookName.json');

/**
 * Retourne une abbréviation universelle pour l'API pour le livre demandé s'il existe.
 * - Les abbréviations supportées sont consultables dans le fichier `canonAbbrv.json`
 */
export const bookTag = (abbrv: string) => {
    return Object.keys(canonAbbrv)
        .find(book => canonAbbrv[book].includes(unidecode(abbrv.toLowerCase())))
        || null;
}

/**
 * Retourne un titre pour le livre demandé s'il existe dans l'un des trois formats suivant (`short` par défaut):
 * - `long` — Titre détaillé (ex: Mt → Evangile selon saint Matthieu)
 * - `short` — Titre abbrégé du livre (ex: 2 Th → 2 Thessaloniciens)
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
