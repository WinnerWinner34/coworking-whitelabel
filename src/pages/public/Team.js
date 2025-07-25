import React from 'react';
import Hero from '../../components/shared/Hero';
import TeamGrid from '../../components/shared/TeamGrid';
import { usePageData } from '../../hooks/usePageData';

export default function Team() {
  const { data, loading } = usePageData('team');
  
  if (loading) return <div className="flex justify-center py-16">Loading...</div>;
  
  return (
    <div>
      <Hero data={data?.hero} />
      <TeamGrid data={data || {}} isEditable={false} />
    </div>
  );
}