import axios from 'axios';
import queryString from 'query-string';
import { DueDiligenceInterface, DueDiligenceGetQueryInterface } from 'interfaces/due-diligence';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDueDiligences = async (
  query?: DueDiligenceGetQueryInterface,
): Promise<PaginatedInterface<DueDiligenceInterface>> => {
  const response = await axios.get('/api/due-diligences', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createDueDiligence = async (dueDiligence: DueDiligenceInterface) => {
  const response = await axios.post('/api/due-diligences', dueDiligence);
  return response.data;
};

export const updateDueDiligenceById = async (id: string, dueDiligence: DueDiligenceInterface) => {
  const response = await axios.put(`/api/due-diligences/${id}`, dueDiligence);
  return response.data;
};

export const getDueDiligenceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/due-diligences/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDueDiligenceById = async (id: string) => {
  const response = await axios.delete(`/api/due-diligences/${id}`);
  return response.data;
};
