import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createFundingProvider } from 'apiSdk/funding-providers';
import { fundingProviderValidationSchema } from 'validationSchema/funding-providers';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { FundingProviderInterface } from 'interfaces/funding-provider';

function FundingProviderCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FundingProviderInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFundingProvider(values);
      resetForm();
      router.push('/funding-providers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FundingProviderInterface>({
    initialValues: {
      funding_amount: 0,
      general_terms: '',
      real_estate_type: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: fundingProviderValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Funding Providers',
              link: '/funding-providers',
            },
            {
              label: 'Create Funding Provider',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Funding Provider
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Funding Amount"
            formControlProps={{
              id: 'funding_amount',
              isInvalid: !!formik.errors?.funding_amount,
            }}
            name="funding_amount"
            error={formik.errors?.funding_amount}
            value={formik.values?.funding_amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('funding_amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.general_terms}
            label={'General Terms'}
            props={{
              name: 'general_terms',
              placeholder: 'General Terms',
              value: formik.values?.general_terms,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.real_estate_type}
            label={'Real Estate Type'}
            props={{
              name: 'real_estate_type',
              placeholder: 'Real Estate Type',
              value: formik.values?.real_estate_type,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/funding-providers')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'funding_provider',
    operation: AccessOperationEnum.CREATE,
  }),
)(FundingProviderCreatePage);
