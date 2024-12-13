import {Request} from 'express';
import moment from 'moment';

interface IMainRequest extends Request {
  uuid?: string;
  trxDatetime?: moment.Moment;
  logTemplate?: string;
}

export {IMainRequest};
