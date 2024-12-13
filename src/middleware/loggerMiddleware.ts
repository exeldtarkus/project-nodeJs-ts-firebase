/* eslint-disable no-console */
import {Response, NextFunction} from 'express';
import dotenv from 'dotenv';

import {IMainRequest} from '../interface/IMainRequest';
import {v4 as uuidv4} from 'uuid';
import {URL} from 'url';
import chalk from 'chalk';

dotenv.config();

const loggerMiddleware = async (
  req: IMainRequest,
  res: Response,
  next: NextFunction,
) => {
  const method = req.method;
  const url = req.url;

  const parsedUrl = new URL(url, `http://${req.headers.host}`);
  const pathWithoutParams = parsedUrl.pathname;

  req.logTemplate = `[${method}:${pathWithoutParams}] - [${uuidv4()}]`;

  console.time(
    `${chalk.green('[INFO]    | ')} ${req.logTemplate} - ${chalk.red(
      '[execution time] ',
    )}`,
  );

  res.on('finish', () => {
    console.timeEnd(
      `${chalk.green('[INFO]    | ')} ${req.logTemplate} - ${chalk.red(
        '[execution time] ',
      )}`,
    );
  });
  return next();
};

export default loggerMiddleware;
