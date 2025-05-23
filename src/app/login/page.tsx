'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import styles from './page.module.scss';

interface LoginForm {
  username: string;
  password: string;
}

const validateLogin = (form: LoginForm) => {
  const errors: Partial<LoginForm> = {};
  if (!form.username || form.username.length < 3) errors.username = 'Minimum 3 characters';
  if (!form.password || form.password.length < 3) errors.password = 'Minimum 3 characters';
  return errors;
};

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginForm>({ username: '', password: '' });
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [loginError, setLoginError] = useState('');
  const { login, user, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user && !isLoading) {
      router.replace('/');
    }
  }, [user, isLoading, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError('');
    const validation = validateLogin(formData);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    try {
      await login(formData.username, formData.password);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('An unexpected error occurred');
      }
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (user) {
    return null;
  }

  return (
    <div className={styles.loginPageContainer}>
      <div className={styles.loginBox}>
        <h1 className={styles.title}>Login</h1>
        {loginError && <div className={styles.errorMessage}>{loginError}</div>}
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              className={`${styles.input} ${errors.username ? styles.inputError : ''}`}
              type="text"
              id="username"
              value={formData.username}
              onChange={e => setFormData({ ...formData, username: e.target.value })}
              placeholder="Username"
              disabled={isLoading}
            />
            {errors.username && <span className={styles.validationError}>{errors.username}</span>}
          </div>
          <div className={styles.inputGroup}>
            <input
              className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
              type="password"
              id="password"
              value={formData.password}
              onChange={e => setFormData({ ...formData, password: e.target.value })}
              placeholder="Password"
              disabled={isLoading}
            />
            {errors.password && <span className={styles.validationError}>{errors.password}</span>}
          </div>
          <button className={styles.loginButton} type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
