import React from 'react';
import Hero from '../../components/shared/Hero';
import EventCalendar from '../../components/shared/EventCalendar';
import { usePageData } from '../../hooks/usePageData';

export default function Events() {
  const { data, loading } = usePageData('events');
  
  if (loading) return <div className="flex justify-center py-16">Loading...</div>;
  
  return (
    <div>
      <Hero data={data?.hero} />
      <EventCalendar data={data || {}} isEditable={false} />
    </div>
  );
}