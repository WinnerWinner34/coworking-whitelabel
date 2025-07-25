import React from 'react';
import Hero from '../../components/shared/Hero';
import { usePageData } from '../../hooks/usePageData';

export default function Home() {
  const { data, loading } = usePageData('home');
  
  if (loading) return <div className="flex justify-center py-16">Loading...</div>;
  
  return (
    <div>
      <Hero data={data?.hero} />
      
      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data?.features?.map((feature) => (
              <div key={feature.id} className="text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}