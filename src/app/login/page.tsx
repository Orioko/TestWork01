'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';
import styles from './page.module.scss';

interface LoginForm {
  username: string;
  password: string;
}

const validateLogin = (form: LoginForm) => {
  const errors: Partial<LoginForm> = {};
  if (!form.username || form.username.length < 3) errors.username = 'Минимум 3 символа';
  if (!form.password || form.password.length < 3) errors.password = 'Минимум 3 символа';
  return errors;
};

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginForm>({ username: '', password: '' });
  const [errors, setErrors] = useState<Partial<LoginForm>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginError, setLoginError] = useState('');
  const { login } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoginError('');
    const validation = validateLogin(formData);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;
    setIsSubmitting(true);
    try {
      await login(formData.username, formData.password);
      router.push('/');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setLoginError(error.message);
      } else {
        setLoginError('An unexpected error occurred');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Login</h1>
      {loginError && <p className={styles.error}>{loginError}</p>}
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="username">Username</label>
          <input
            className={styles.input}
            type="text"
            id="username"
            value={formData.username}
            onChange={e => setFormData({ ...formData, username: e.target.value })}
          />
          {errors.username && <span className={styles.error}>{errors.username}</span>}
        </div>
        <div className={styles.field}>
          <label htmlFor="password">Password</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            value={formData.password}
            onChange={e => setFormData({ ...formData, password: e.target.value })}
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>
        <button className={styles.button} type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
