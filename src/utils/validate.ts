export const validateLogin = (data: { username: string; password: string }) => {
  const errors: Record<string, string> = {};

  if (!data.username || data.username.length < 3) {
    errors.username = 'Username must be at least 3 characters';
  }

  if (!data.password || data.password.length < 3) {
    errors.password = 'Password must be at least 3 characters';
  }

  return errors;
};
