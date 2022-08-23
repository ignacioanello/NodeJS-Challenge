import { Types } from 'mongoose';
import { Comment } from '../models';
import { IComment } from '../models/comment';

export class CommentService {

    static find(id: Types.ObjectId) {
        return Comment.find({ article: id }).populate('article').lean().exec();
    }

    static create(comment: IComment) {
        return Comment.create(comment);
    }

    static update(commentId: Types.ObjectId, comment: IComment) {
        return Comment.findByIdAndUpdate(commentId, comment, { new: true }).lean().exec();
    }

    static remove(commentId: Types.ObjectId) {
        return Comment.findByIdAndRemove(commentId, { new: true }).lean().exec();
    }
}