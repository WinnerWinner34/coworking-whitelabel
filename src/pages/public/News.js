import React from 'react';
import Hero from '../../components/shared/Hero';
import NewsList from '../../components/shared/NewsList';
import { usePageData } from '../../hooks/usePageData';

export default function News() {
  const { data, loading } = usePageData('news');
  
  if (loading) return <div className="flex justify-center py-16">Loading...</div>;
  
  return (
    <div>
      <Hero data={data?.hero} />
      <NewsList data={data || {}} isEditable={false} />
    </div>
  );
}