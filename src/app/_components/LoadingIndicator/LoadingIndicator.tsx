'use client';

import { FC } from 'react';
import styles from './LoadingIndicator.module.scss';

interface LoadingIndicatorProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingIndicator: FC<LoadingIndicatorProps> = ({
  size = 'medium',
  color = 'var(--color-primary)',
}) => {
  return <div className={`${styles.spinner} ${styles[size]}`} style={{ borderColor: color }} />;
};

export default LoadingIndicator;
