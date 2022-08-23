import { Router } from "express";
import { check } from "express-validator";
import { CommentController } from '../../controllers/comment.controller';
import { validateFields } from "../../middleware/validate-fields";

export const commentApi = (router: Router) => {
    router.get('/', CommentController.find);

    router.post('/', [
        check('comment.article', 'The Article is mandatory').not().isEmpty(),
        check('comment.article', 'The Article ID must be valid').isMongoId(),
        check('comment.author', 'The Author is mandatory').not().isEmpty(),
        validateFields
    ], CommentController.create);

    router.put('/:id', [
        check('comment.article', 'The Article is mandatory').not().isEmpty(),
        check('comment.article', 'The Article ID must be valid').isMongoId(),
        check('comment.author', 'The Author is mandatory').not().isEmpty(),
        validateFields
    ], CommentController.update);

    router.delete('/:id', CommentController.remove);

    return router;
}