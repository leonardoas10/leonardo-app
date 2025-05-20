export interface IChipSelector {
    _ids: Array<string>;
    values: Array<string>;
}

export interface IChipSelectorByLanguages {
    _ids: Array<string>;
    values: Array<ILanguage>;
}
export interface ISelector {
    _ids: Array<string>;
    values: Array<string>;
}

export interface ISelectorByLanguages {
    _ids: Array<string>;
    values: Array<ILanguage>;
}

interface ILanguage {
    languages: {
        [key: string]: {
            name: string;
        };
    };
}
