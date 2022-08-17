
//ECMAScript Module
// const { ObjectId } = require('mongoose').Types;

//ES6 Module (Usado en Typescript)
import { NextFunction, Request, Response } from "express";
import { isValidObjectId, Types } from "mongoose";
import { Article } from "../models";
import { IArticle } from "../models/article";
import { ArticleService } from "../services/article.service";

const { ObjectId } = Types;

export class ArticleController {

    static async fetch(req: Request, res: Response, next: NextFunction) {
        try {
            res.json(await ArticleService.fetch());
        } catch (error) {
            console.log(error);
            next();
        }
    }

    static async find(req: Request, res: Response, next: NextFunction) {
        const id = req.params.id;

        if (!isValidObjectId(id)) {
            return res.json({
                ok: false,
                msg: `The provided article ID: ${id}, is not valid.`
            });
        }

        const articleId = new ObjectId(id);

        try {
            res.json(await ArticleService.find(articleId));
        } catch (error) {
            console.log(error);
            next();
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        const newArticle: IArticle = new Article({ ...req.body.article });

        try {
            res.status(201).json(await ArticleService.create(newArticle));
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
                msg: `The provided article ID: ${id}, is not valid.`
            });
        }

        const articleId = new ObjectId(id);
        const newArticle: IArticle = { ...req.body.article };

        try {
            res.status(200).json(await ArticleService.update(articleId, newArticle));
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
                msg: `The provided article ID: ${id}, is not valid.`
            });
        }

        const articleId = new ObjectId(id);

        try {
            res.status(200).json(await ArticleService.remove(articleId));
        } catch (error) {
            console.log(error);
            next();
        }
        // res.end(); ==> Se termina la respuesta. Es un 200 vacio.
    }
}

// export default ArticleController;