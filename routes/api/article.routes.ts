import { Router } from "express";
import { check } from 'express-validator';
import { ArticleController } from '../../controllers/article.controller';
import { validateFields } from "../../middleware/validate-fields";

export const articleApi = (router: Router) => {
    router.get('/', ArticleController.fetch);

    router.get('/:id', ArticleController.find);

    router.post('/', [
        check('article.title', 'The Title is mandatory').not().isEmpty(),
        check('article.body', 'The Body is mandatory').not().isEmpty(),
        check('article.author', 'The Author is mandatory').not().isEmpty(),
        validateFields
    ], ArticleController.create);

    router.put('/:id', [
        check('article.title', 'The Title is mandatory').not().isEmpty(),
        check('article.body', 'The Body is mandatory').not().isEmpty(),
        check('article.author', 'The Author is mandatory').not().isEmpty(),
        validateFields
    ], ArticleController.update);

    router.delete('/:id', ArticleController.remove);

    return router;
}

// export default articleApi;