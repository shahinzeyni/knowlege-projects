'use client';

import { useEffect } from 'react';

import Link from 'next/link';

import { useDisclosure } from '@mantine/hooks';

import { Button, Container, Flex, Grid, Text, Title } from '@mantine/core';

import { useAccountDetailForm } from '@/hooks/formik/useAccountDetailFormik';

import BaseTextInput from '@/components/material/inputs/BaseTextInput/BaseText.input';
import BirthdayInput from '@/components/material/inputs/BirthdayInput/Birthday.input';
import PrimaryButton from '@/components/material/buttons/PrimaryButton/Primary.button';
import LogoutModal from '@/components/material/modals/LogoutModal/Logout.modal';

import { getAccountDetail, submitAccountDetail } from '@/data/server_requests/dashboard_page/account_detail';

import styles from './AccountDetailSection.module.css';


const AccountDetailSection = () => {
  const [openLogoutModal, logoutModalActions] = useDisclosure();

  const submitHandler = async (values: any) => {
    await submitAccountDetail(values);
  };

  const { values, errors, handleSubmit, handleChange, setFieldValue } =
    useAccountDetailForm(submitHandler);

  const getAccountUserData = async () => {
    const response = await getAccountDetail();

    setFieldValue('email', response.email || '');
    setFieldValue('fullName', response.fullName || '');
    setFieldValue('mobile', response.phone || '');
    setFieldValue('birthDate', response.dateCreated || '');
  };

  useEffect(() => {
    getAccountUserData();
  }, []);

  const handleChangeDate = (date: any) => {
    setFieldValue('birthDate', date);
  };

  return (
    <Flex className={styles.container} data-testid="wrapper">
      <Container>
        <Grid
          className={styles.wrapper}
          component="form"
          data-testid="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Grid.Col span={12} className={styles.header}>
            <Title order={5}>Account Detail</Title>
            <Button
              variant="transparent"
              color="var(--mantine-color-red-5)"
              onClick={logoutModalActions.open}
            >
              Logout
            </Button>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} className={styles.grid_col}>
            <BaseTextInput
              label="Email address"
              name="email"
              type="email"
              style={{
                '--base-text-field-bg-color': 'var(--mantine-color-white)',
              }}
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} className={styles.grid_col}>
            <BaseTextInput
              label="Full name"
              name="fullName"
              style={{ '--base-text-field-bg-color': 'var(--mantine-color-white)' }}
              value={values.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} className={styles.grid_col}>
            <BaseTextInput
              label="Mobile number"
              name="mobile"
              style={{ '--base-text-field-bg-color': 'var(--mantine-color-white)' }}
              value={values.mobile}
              onChange={handleChange}
              error={errors.mobile}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} className={styles.grid_col}>
            <BirthdayInput inputValue={values.birthDate} onChange={handleChangeDate} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} className={styles.grid_col}>
            <PrimaryButton type="submit" fullWidth>
              Save changes
            </PrimaryButton>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }} className={styles.grid_col}>
            <Button
              className={styles.logout_btn}
              variant="transparent"
              color="var(--mantine-color-red-5)"
              onClick={logoutModalActions.open}
              data-testid="logout"
            >
              Logout
            </Button>
          </Grid.Col>
          <Grid.Col span={12} className={styles.text}>
            <Text>If you wish to delete your account, please click the button below.</Text>
            <Text>
              By clicking this button, you will permanently delete your account and all associated
              data. This action cannot be undone.
            </Text>
          </Grid.Col>
          <Button
            variant="transparent"
            color="var(--mantine-color-red-5)"
            component={Link}
            href="/dashboard/account-detail/delete-account"
          >
            Delete my account
          </Button>
        </Grid>
      </Container>
      <LogoutModal opened={openLogoutModal} onClose={logoutModalActions.close} />
    </Flex>
  );
};

export default AccountDetailSection;
