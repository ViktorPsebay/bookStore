import { typesOfAction } from '../consts';
import { usersInterface, actionInterface } from '../types/types';

export const deleteUser = (user: usersInterface[]): actionInterface => {
  return {
    type: typesOfAction.deleteUser,
    payload: user,
  };
};

export const editUser = (user: usersInterface[]): actionInterface => {
  return {
    type: typesOfAction.editUser,
    payload: user,
  };
};

export const addUsers = (users: usersInterface[]): actionInterface => {
  return {
    type: typesOfAction.addUsers,
    payload: users,
  };
};

export const addOneUser = (users: usersInterface[]): actionInterface => {
  return {
    type: typesOfAction.addOneUser,
    payload: users,
  };
};

export const setUser = (users: usersInterface[]): actionInterface => {
  return {
    type: typesOfAction.setUser,
    payload: users,
  };
};