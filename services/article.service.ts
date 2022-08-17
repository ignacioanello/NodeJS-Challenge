
import { Types } from 'mongoose';
import { Article } from '../models';
import { IArticle } from '../models/article';

export class ArticleService {

    static fetch() {
        //lean() => Cuando no queres que trackee los cambios sonre el REPL_MODE_SLOPPY, sino que devuelva objetos planos
        //para que Node use menos recursos.

        //exec() => para que lo ejecute(???)
        return Article.find().lean().exec();
    }

    static find(id: Types.ObjectId) {
        return Article.findById(id).lean().exec();
    }

    static create(article: IArticle) {
        //add validation for checking articles existance.
        return Article.create(article);
    }

    static update(id: Types.ObjectId, article: IArticle) {
        return Article.findByIdAndUpdate(id, article, { new: true }).lean().exec();
    }

    static remove(id: Types.ObjectId) {
        return Article.findByIdAndRemove(id).lean().exec();
    }
}

// export default ArticleService;