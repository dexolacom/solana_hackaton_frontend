import axios from 'axios';
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;
import { TokenType, ProjectType, ResponseProjectTypeItem } from '../types';

const API = axios.create({
  baseURL: BASE_API_URL
});

export const getProjectList = async () => {
  return (await API.get<ProjectType[]>('/project/list'));
}

export const getTokenList = async () => {
  return (await API.get<TokenType[]>('/token/list'));
}

export const getProjectById = async (id: string) => {
  return (await API.get<ResponseProjectTypeItem>(`/project/${id}`));
}

export const getTokenById = async (id: string) => {
  return (await API.get<TokenType[]>(`/token/${id}`));
}