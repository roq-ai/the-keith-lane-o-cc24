import * as yup from 'yup';

export const fundingProviderValidationSchema = yup.object().shape({
  funding_amount: yup.number().integer().required(),
  general_terms: yup.string().required(),
  real_estate_type: yup.string().required(),
  user_id: yup.string().nullable(),
});
