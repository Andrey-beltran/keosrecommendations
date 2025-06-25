import { createContext } from 'react';
import { MyAuthType } from '../types';

export const AuthContext = createContext<MyAuthType>({});
