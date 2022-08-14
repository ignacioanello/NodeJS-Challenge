import { Application, Router } from 'express';
import { api } from './api'

// const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     next()
// };

class Routes {
    static configure(app: Application) {
        app.use('/api', api(Router()));

        //Ruteo por estructura de archivos.
        //Por ejemplo si quiero usar una public API sin validacion y la API con validacion
        // app.use('/public-api', api(Router()));
    }
}

export default Routes;