import express, {Express, Request, Response} from 'express';
import {router} from '../routes/userRoutes';
import loggerMiddleware from '../middleware/loggerMiddleware';

// eslint-disable-next-line
import bodyParser from 'body-parser';
import cors from 'cors';
import {cors_config} from '../config/corsConfig';

const app: Express = express();

const corsOptions: cors.CorsOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  origin: (origin: any, callback: any) => {
    if (cors_config.allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(loggerMiddleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Root endpoint (/) to respond with "Backend Repo Service"
app.get('/', (req: Request, res: Response) => {
  res.json({title: 'Backend Repo Service'});
});

// API routes
app.use('/api', router);

export default app;
