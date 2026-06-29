import { User } from '../Interface/user';

export const userData: User = {
  name: Math.random().toString(36).substring(2, 15),
  email: Math.random().toString(36).substring(2, 15) + '@example.com',
  gender: 'male',
  status: 'active',
};
