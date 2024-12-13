import logger from '../common/Logger';
import {db} from '../config/firebaseConfig';
import {User} from '../entities/user';

const USERS_COLLECTION = 'USERS';

const updateUser = async (docId: string, user: User): Promise<void> => {
  logger.info(`updateUser - docId: ${docId} - user: ${user}`);

  await db.collection(USERS_COLLECTION).doc(docId).set(user);
};

const fetchUsers = async (): Promise<User[]> => {
  const userSnapshot = await db.collection(USERS_COLLECTION).get();

  if (userSnapshot.empty) {
    logger.info(`No users found in the collection: ${USERS_COLLECTION}`);
    return [];
  }

  const users: User[] = [];
  userSnapshot.forEach(doc => {
    users.push(doc.data() as User);
  });

  logger.info(`Fetched ${users.length} users`);
  return users;
};

const fetchUserById = async (userId: string): Promise<User | null> => {
  const userDoc = await db.collection(USERS_COLLECTION).doc(userId).get();

  if (!userDoc.exists) {
    logger.info(`User not found with ID: ${userId}`);
    return null;
  }

  logger.info('userDoc', userDoc);

  return userDoc.data() as User;
};

const addUser = async (data: User) => {
  if (!data.id) {
    throw new Error('User ID is required for adding a user');
  }

  const userData = {
    id: data.id,
    name: data.name,
    email: data.email,
    age: data.age,
  };

  await db.collection(USERS_COLLECTION).doc(data.id.toString()).set(userData);
};

export {addUser, updateUser, fetchUsers, fetchUserById};
