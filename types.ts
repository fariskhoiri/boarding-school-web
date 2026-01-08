import React from 'react';

export interface NewsItem {
  id: string; // Changed from number to string to match CMS IDs
  title: string;
  category: string;
  date: string;
  image: string;
  description: string;
  slug?: string; // Added for routing
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

export interface Teacher {
  id: string;
  name: string;
  role: string;
  subRole?: string;
  subject?: string;
  image: string;
  email?: string;
  bio?: string;
  isLeadership?: boolean;
}