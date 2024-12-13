import {Request, Response} from 'express';
import {
  updateUser,
  fetchUsers,
  addUser,
  fetchUserById,
} from '../repository/userCollection';
import {User} from '../entities/user';
import logger from '../common/Logger';

const fetchUserData = async (req: Request, res: Response) => {
  const user = await fetchUsers();

  if (!user) {
    return res.status(404).json({message: 'User not found'});
  }

  return res.status(200).json(user);
};

const updateUserData = async (req: Request, res: Response) => {
  const user: User = req.body;
  const {id} = req.params;

  if (!user.id || !user.name || !user.email || !user.age) {
    return res.status(400).json({message: 'Invalid user data'});
  }

  const findUser = await fetchUserById(id);

  if (!findUser) {
    logger.info('user not found!');
    return res.status(404).json({message: 'User not found'});
  }

  logger.info('findUser', findUser);

  await updateUser(id, user);
  return res.status(200).json({message: 'User data updated successfully'});
};

const insertUserData = async (req: Request, res: Response) => {
  const user: User = req.body;

  if (!user.id || !user.name || !user.email || !user.age) {
    return res.status(400).json({message: 'Invalid user data'});
  }

  await addUser(user);
  return res.status(200).json({message: 'User data insert successfully'});
};

export {updateUserData, fetchUserData, insertUserData};
