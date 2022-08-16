import { NextFunction, Request, Response } from 'express'
import { Types } from "mongoose";
import { Comment } from '../models';
import { IComment } from '../models/comment';
import { CommentService } from '../services/comment.service';

const { ObjectId } = Types;
// const commentService = new CommentService();

export class CommentController {

    static async find(req: Request, res: Response, next: NextFunction) {
        const articleId = new ObjectId(req.query.article?.toString());
        return res.send(await CommentService.find(articleId));
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newComment: IComment = new Comment({ ...req.body.comment });
            return res.status(201).send(await CommentService.create(newComment));

        } catch (error) {
            console.log(error);
            next();
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const commentId = new ObjectId(req.params.id);
        const comment: IComment = { ...req.body.comment };

        return res.status(200).send(await CommentService.update(commentId, comment));
    }

    static remove(req: Request, res: Response, next: NextFunction) {
        const commentId = new ObjectId(req.params.id);
        return res.status(200).send(CommentService.remove(commentId));
    }
}

// export default CommentController;