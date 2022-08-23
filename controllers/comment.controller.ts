import { NextFunction, Request, Response } from 'express'
import { isValidObjectId, Types } from "mongoose";
import { Comment, IComment } from '../models';
import { CommentService } from '../services/comment.service';

const { ObjectId } = Types;

export class CommentController {

    static async find(req: Request, res: Response, next: NextFunction) {
        const articleId = new ObjectId(req.query.article?.toString());

        try {
            res.json(await CommentService.find(articleId));
        } catch (error) {
            console.log(error);
            next();
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        const newComment: IComment = new Comment({ ...req.body.comment });

        try {
            res.status(201).json(await CommentService.create(newComment));
        } catch (error) {
            console.log(error);
            next();
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                ok: false,
                msg: `The provided comment ID: ${id}, is not valid.`
            });
        }

        const commentId = new ObjectId(id);
        const comment: IComment = { ...req.body.comment };

        try {
            res.status(200).json(await CommentService.update(commentId, comment));
        } catch (error) {
            console.log(error);
            next();
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;

        if (!isValidObjectId(id)) {
            return res.status(400).json({
                ok: false,
                msg: `The provided comment ID: ${id}, is not valid.`
            });
        }

        const commentId = new ObjectId(id);

        try {
            res.status(200).json(await CommentService.remove(commentId));
        } catch (error) {
            console.log(error);
            next();
        }
    }
}
