import { ofetch } from 'ofetch';

export const api = ofetch.create({ baseURL: 'http://localhost:31299/api' });
