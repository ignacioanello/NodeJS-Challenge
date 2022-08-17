import { Types } from 'mongoose';
import { Comment } from '../models';
import { IComment } from '../models/comment';

// lean() => Cuando no queres que trackee los cambios sonre el REPL_MODE_SLOPPY, sino que devuelva objetos planos
// para que Node use menos recursos.

// exec() => para que lo ejecute(???)
// return Comment.find({}).lean().exec();

// ---- Filter by article and return body and NOT _id
// const pepe = await Comment.find({ article: '123' }, { body: 1, _id: 0 }) 
//     .sort({ author: 1 }) //1 = asc | -1 = desc
//     .lean()
//     .exec();

// --- Te devuelve todos los comentarios de ESTE article especifico (123)
// await Comment.find({ article: '123' }
export class CommentService {

    static find(id: Types.ObjectId) {
        return Comment.find({ article: id }).populate('article').lean().exec();
    }

    static create(comment: IComment) {
        //Enhancement: add validation for checking articles existance.
        return Comment.create(comment);
    }

    static update(commentId: Types.ObjectId, comment: IComment) {
        return Comment.findByIdAndUpdate(commentId, comment, { new: true }).lean().exec();
    }

    static remove(commentId: Types.ObjectId) {
        return Comment.findByIdAndRemove(commentId, { new: true }).lean().exec();
    }
}

// export default CommentService;