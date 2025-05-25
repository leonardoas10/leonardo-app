import { ICategory } from './categories';
// import { ITag } from './tags';
import { IUser } from './user';

export interface IImageManager {
    _id?: string;
    imageUrl: string;
    imageKey: string;
    uploadedBy: IUser;
    imageUrlThumbnail?: string;
    imageUrlThumbnailKey?: string;
    categories?: Array<ICategory>;
    // tags?: Array<ITag>;
    name: string;
}
