import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FundingProviderInterface {
  id?: string;
  funding_amount: number;
  general_terms: string;
  real_estate_type: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface FundingProviderGetQueryInterface extends GetQueryInterface {
  id?: string;
  general_terms?: string;
  real_estate_type?: string;
  user_id?: string;
}
