import axios from 'axios';
import queryString from 'query-string';
import { FinancePartnerInterface, FinancePartnerGetQueryInterface } from 'interfaces/finance-partner';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFinancePartners = async (
  query?: FinancePartnerGetQueryInterface,
): Promise<PaginatedInterface<FinancePartnerInterface>> => {
  const response = await axios.get('/api/finance-partners', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFinancePartner = async (financePartner: FinancePartnerInterface) => {
  const response = await axios.post('/api/finance-partners', financePartner);
  return response.data;
};

export const updateFinancePartnerById = async (id: string, financePartner: FinancePartnerInterface) => {
  const response = await axios.put(`/api/finance-partners/${id}`, financePartner);
  return response.data;
};

export const getFinancePartnerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/finance-partners/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFinancePartnerById = async (id: string) => {
  const response = await axios.delete(`/api/finance-partners/${id}`);
  return response.data;
};
