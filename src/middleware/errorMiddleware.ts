import {Request, Response, NextFunction} from 'express';
import {ErrorResourceModel} from '../common/error';
import logger from '../common/Logger';
import {IMainRequest} from '../interface/IMainRequest';

// Explicitly typing the middleware
const handleError: (
  err: Error | TypeError | ErrorResourceModel,
  req: Request | IMainRequest,
  res: Response,
  next: NextFunction,
) => Response = (err, req, res, next) => {
  let customError = err;

  logger.error(
    (req as IMainRequest).logTemplate || '[handle-error]',
    '[ERROR]',
    JSON.stringify(err),
  );

  if (!(err instanceof ErrorResourceModel)) {
    customError = new ErrorResourceModel('Internal server error!', 500);
  }

  return res.status((customError as ErrorResourceModel).status).json({
    message: (customError as ErrorResourceModel).message,
    status: (customError as ErrorResourceModel).status,
  });
};

export default handleError;
