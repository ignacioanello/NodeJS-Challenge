
import { Types } from 'mongoose';
import { Article } from '../models';
import { IArticle } from '../models/article';

// const { ObjectId } = Types;

export class ArticleService {

    fetch() {
        //lean() => Cuando no queres que trackee los cambios sonre el REPL_MODE_SLOPPY, sino que devuelva objetos planos
        //para que Node use menos recursos.

        //exec() => para que lo ejecute(???)
        return Article.find().lean().exec();
    }

    find(id: Types.ObjectId) {
        return Article.findById(id).lean().exec();
    }

    create(article: IArticle) {
        return Article.create(article);
    }

    update(id: Types.ObjectId, article: IArticle) {
        return Article.findByIdAndUpdate(id, article, { new: true }).lean().exec();
    }

    remove(id: Types.ObjectId) {
        return Article.findByIdAndRemove(id).lean().exec();
    }
}

// export default ArticleService;