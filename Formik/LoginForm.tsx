'use client';

import Link from 'next/link';

import { Box, Divider, Flex, Text, Title } from '@mantine/core';

import CheckboxInput from '../../inputs/CheckboxInput/Checkbox.input';
import BaseTextInput from '../../inputs/BaseTextInput/BaseText.input';
import OAuthButton from '../../buttons/OAuthButton/OAuth.button';
import PrimaryButton from '../../buttons/PrimaryButton/Primary.button';

import { useLoginForm } from '@/hooks/formik/useLoginFormik';

import BasePasswordInput from '../../inputs/BasePasswordInput/BasePassword.input';

import styles from './Login.form.module.css';

const LoginForm = () => {
  const submitHandler = () => {};

  const { values, errors, handleSubmit, handleChange } = useLoginForm(submitHandler);

  return (
    <Box className={[styles.container, 'mantine-Container-root'].join(' ')} data-testid="container">
      <Box className={styles.wrapper} data-testid="wrapper">
        <Title order={5}>Login</Title>
        <Flex className={styles.inner}>
          <Title order={4}>Welcome back!</Title>
          <Flex
            classNames={{ root: styles.form_container }}
            component="form"
            onSubmit={handleSubmit as any}
          >
            <BaseTextInput
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
            />
            <BasePasswordInput
              label="Password"
              name="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
            />
            <Flex className={styles.checkbox}>
              <CheckboxInput
                label="Remember me"
                name="remember"
                onChange={handleChange}
                error={errors.remember}
              />
              <Link href="/auth/forget-password">Forget password?</Link>
            </Flex>
            <PrimaryButton data-testid="submit" type="submit" size="lg">
              Continue
            </PrimaryButton>
          </Flex>
          <Text component="p">
            Don’t have an account?{' '}
            <Text href="/auth/signup" component={Link}>
              Signup
            </Text>
          </Text>
          <Divider className={styles.divider} label="or" labelPosition="center" />
          <Flex className={styles.oauth_methods}>
            <OAuthButton href="https://google.com" provider="Google" fullWidth />
            <OAuthButton href="https://apple.com" provider="Apple" fullWidth />
            <OAuthButton href="https://facebook.com" provider="Facebook" fullWidth />
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default LoginForm;
