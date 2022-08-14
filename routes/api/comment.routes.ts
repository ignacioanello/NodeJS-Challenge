import { Router } from "express";
import { CommentController } from '../../controllers/comment.controller';

export const commentApi = (router: Router) => {
    router.get('/', CommentController.find);
    router.post('/', CommentController.create);
    router.put('/:id', CommentController.update);
    router.delete('/:id', CommentController.remove);

    return router;
}

// export default commentsApi;