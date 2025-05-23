'use client';

import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './ErrorBoundary.module.scss';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className={styles.errorContainer}>
            <h2>Что-то пошло не так</h2>
            <p>Пожалуйста, попробуйте обновить страницу</p>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
