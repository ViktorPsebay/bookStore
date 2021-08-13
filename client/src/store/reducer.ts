import { typesOfAction } from '../consts';
import { usersInterface } from '../types/types';

const defaultState: {users: usersInterface[], authUser: usersInterface | null} = {
  users: [],
  authUser: null,
};

const deleteUser = (currentUser: usersInterface[], allUsers: usersInterface[]) => {
  return allUsers.filter(item => item.email !== currentUser[0].email);
};

const editUser = (currentUser: usersInterface[], allUsers: usersInterface[]) => {
  return allUsers.map(item => {
    if (item.email !== currentUser[0].email) return item;
    return {
      id: item.id,
      fullName: currentUser[0].fullName,
      email: item.email,
      birthday: currentUser[0].birthday,
    };
  });
};

const setUser = (currentUser: usersInterface[]) => {
  if (!currentUser[0]) return null;
  return {
    id: currentUser[0].id,
    fullName: currentUser[0].fullName,
    email: currentUser[0].email,
    birthday: currentUser[0].birthday,
  };
};

export const reducer = (state = defaultState, action: {type: string, payload: usersInterface[] | []}): 
{users: usersInterface[], authUser: usersInterface | null} => {
  switch (action.type) {
  case typesOfAction.addUsers: {
    return { ...state, users: [...state.users, ...action.payload] };
  }

  case typesOfAction.deleteUser: {
    const allUsers = deleteUser(action.payload, state.users);
    return { ...state, users: allUsers };
  }

  case typesOfAction.editUser: {
    const allUsers = editUser(action.payload, state.users);
    return { ...state, users: allUsers };
  }

  case typesOfAction.setUser: {
    const user = setUser(action.payload);
    return { ...state, authUser: user };
  }
    break;
  default:
    return state;
  }
};