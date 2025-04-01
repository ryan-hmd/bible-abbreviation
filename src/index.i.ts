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

type Lang = "en" | "fr";
type Size = "long" | "short" | "tiny";
