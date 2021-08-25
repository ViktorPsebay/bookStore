import axios from 'axios';
import { serverUrl } from '../consts';

export const instance = axios.create({
  baseURL: serverUrl,
});
