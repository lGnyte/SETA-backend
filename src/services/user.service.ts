import {getAllUsers} from '../repositories/user.repository';

export const fetchAllUsers = async () => {
  return await getAllUsers();
};
