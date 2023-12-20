interface CanonAbbrv {
    [key: string]: string[];
}

interface BookTitle {
    long: string;
    short: string;
    tiny: string;
}

interface BookTitleMap {
    [key: string]: BookTitle;
}