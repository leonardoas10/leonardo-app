export interface ICategory {
    _id?: string;
    languages: {
        [key: string]: {
            name: string;
        };
    };
    title: string;
}
