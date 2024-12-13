import express from 'express';

import * as userController from '../controller/api';
import wrap from '../middleware/wrapperMiddleware';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get(
  '/fetch-user-data',
  wrap(authMiddleware),
  wrap(userController.fetchUserData),
);

router.put(
  '/update-user-data/:id',
  wrap(authMiddleware),
  wrap(userController.updateUserData),
);

router.post(
  '/insert-user-data',
  wrap(authMiddleware),
  wrap(userController.insertUserData),
);

export {router};
