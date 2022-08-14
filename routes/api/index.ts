import { Router } from 'express';
import { articleApi } from './article.routes';
import { commentApi } from './comment.routes';

export const api = (router: Router) => {
    router.use('/articles', articleApi(Router()));
    router.use('/comments', commentApi(Router()));
    return router;
}

// export default api;