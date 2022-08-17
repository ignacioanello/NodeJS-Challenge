import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

export const validateFields = (req: Request, res: Response, next: NextFunction) => {
    //Puedo agarrar todos los errores que hubo en los checks de los middleware de la ruta
    //va a crear en el request un array de errores con los errores que pasaron en la ruta, a traves del middleware
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
};
