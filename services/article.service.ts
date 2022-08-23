import { Types } from 'mongoose';
import { Article } from '../models';
import { IArticle } from '../models/article';

export class ArticleService {

    static fetch() {
        return Article.find().lean().exec();
    }

    static find(id: Types.ObjectId) {
        return Article.findById(id).lean().exec();
    }

    static create(article: IArticle) {
        return Article.create(article);
    }

    static update(id: Types.ObjectId, article: IArticle) {
        return Article.findByIdAndUpdate(id, article, { new: true }).lean().exec();
    }

    static remove(id: Types.ObjectId) {
        return Article.findByIdAndRemove(id).lean().exec();
    }
}