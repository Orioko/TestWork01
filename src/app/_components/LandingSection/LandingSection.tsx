import React from 'react';
import styles from './LandingSection.module.scss';

export const LandingSectionBackgrounds = {
  main1: '#ffffff',
  main2: '#f8f9fa',
  main3: '#f1f3f5',
  main4: '#e9ecef',
  main5: '#dee2e6',
  white: '#ffffff',
} as const;

type BackgroundColor = (typeof LandingSectionBackgrounds)[keyof typeof LandingSectionBackgrounds];

interface LandingSectionProps {
  children: React.ReactNode;
  backgroundColor?: BackgroundColor;
  style?: React.CSSProperties;
  className?: string;
}

const LandingSection: React.FC<LandingSectionProps> = ({
  children,
  backgroundColor = LandingSectionBackgrounds.white,
  style = {},
  className = '',
}) => {
  return (
    <section
      className={`${className} ${styles.container} ${styles.sectionBody}`}
      style={{ ...style, backgroundColor }}
    >
      {children}
    </section>
  );
};

export default LandingSection;
