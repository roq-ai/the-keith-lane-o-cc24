import * as yup from 'yup';

export const financePartnerValidationSchema = yup.object().shape({
  partnership_proposal: yup.string().required(),
  user_id: yup.string().nullable(),
});
