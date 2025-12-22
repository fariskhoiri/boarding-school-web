import React from 'react';

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
}

export interface StatItem {
  id: number;
  value: string;
  label: string;
  icon: React.ReactNode;
}

export interface AnnouncementItem {
  id: number;
  title: string;
  date: string;
}

export interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  delay?: number;
}