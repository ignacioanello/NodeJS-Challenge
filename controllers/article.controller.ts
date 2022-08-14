
//ECMAScript Module
// const { ObjectId } = require('mongoose').Types;

//ES6 Module (Usado en Typescript)
import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Article } from "../models";
import { IArticle } from "../models/article";
import { ArticleService } from "../services/article.service";

const { ObjectId } = Types;
const articleService = new ArticleService();

export class ArticleController {
    
    static async fetch(req: Request, res: Response, next: NextFunction) {
        try {
            return res.send(await articleService.fetch());

        } catch (error) {
            console.log(error);
            next();
        }
    }

    static async find(req: Request, res: Response, next: NextFunction) {
        const articleId = new ObjectId(req.params.id);

        try {
            return res.send(await articleService.find(articleId));
        } catch (error) {
            console.log(error);
            next();
        }
    }

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newArticle: IArticle = new Article({ ...req.body.article });
            return res.status(201).send(await articleService.create(newArticle));

        } catch (error) {
            console.log(error);
            next();
        }
    }

    static async update(req: Request, res: Response, next: NextFunction) {
        try {
            const articleId = new ObjectId(req.params.id);
            const newArticle: IArticle = { ...req.body.article };

            return res.send(await articleService.update(articleId, newArticle));
        } catch (error) {
            console.log(error);
            next();
        }
    }

    static async remove(req: Request, res: Response, next: NextFunction) {
        try {
            const articleId = new ObjectId(req.params.id);
            return res.send(await articleService.remove(articleId));

        } catch (error) {
            console.log(error);
            next();
        }
        // //Se termina la respuesta. Es un 200 vacio.
        // res.end();
    }
}

// export default ArticleController;