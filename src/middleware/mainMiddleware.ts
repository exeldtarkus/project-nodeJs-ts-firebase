import {Response, NextFunction} from 'express';

import {IMainRequest} from '../interface/IMainRequest';
import {v4 as uuidv4} from 'uuid';
import {now} from '../utils/timeUtils';

const mainMiddleware = async (
  req: IMainRequest,
  res: Response,
  next: NextFunction,
) => {
  req.uuid = uuidv4();
  req.trxDatetime = now().add(7, 'hours');
  return next();
};

export default mainMiddleware;
