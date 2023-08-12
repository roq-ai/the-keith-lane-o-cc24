import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FinancePartnerInterface {
  id?: string;
  partnership_proposal: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface FinancePartnerGetQueryInterface extends GetQueryInterface {
  id?: string;
  partnership_proposal?: string;
  user_id?: string;
}
