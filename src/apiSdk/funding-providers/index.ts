import axios from 'axios';
import queryString from 'query-string';
import { FundingProviderInterface, FundingProviderGetQueryInterface } from 'interfaces/funding-provider';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFundingProviders = async (
  query?: FundingProviderGetQueryInterface,
): Promise<PaginatedInterface<FundingProviderInterface>> => {
  const response = await axios.get('/api/funding-providers', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFundingProvider = async (fundingProvider: FundingProviderInterface) => {
  const response = await axios.post('/api/funding-providers', fundingProvider);
  return response.data;
};

export const updateFundingProviderById = async (id: string, fundingProvider: FundingProviderInterface) => {
  const response = await axios.put(`/api/funding-providers/${id}`, fundingProvider);
  return response.data;
};

export const getFundingProviderById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/funding-providers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFundingProviderById = async (id: string) => {
  const response = await axios.delete(`/api/funding-providers/${id}`);
  return response.data;
};
