import chalk from 'chalk';
import app from './core/app';
import logger from './common/Logger';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.APP_PORT || 8094;
app.listen(port, () => {
  logger.info(
    `${chalk.yellow('⚡️')}[server]: Server is running at`,
    chalk.underline(`http://localhost:${port}`),
  );
});

export default app;
