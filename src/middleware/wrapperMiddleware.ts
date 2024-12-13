import {NextFunction, Response} from 'express';
import {IMainRequest} from '../interface/IMainRequest';

const wrapperMiddleware =
  (fn: (req: IMainRequest, res: Response, next: NextFunction) => any) =>
  (req: IMainRequest, res: Response, next: NextFunction) => {
    try {
      const result = fn(req, res, next);

      if (
        result &&
        typeof result.then === 'function' &&
        typeof result.catch === 'function'
      ) {
        return result.catch(next);
      }

      return result;
    } catch (err) {
      return next(err);
    }
  };

export default wrapperMiddleware;
