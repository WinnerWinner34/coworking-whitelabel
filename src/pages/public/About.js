import React from 'react';
import Hero from '../../components/shared/Hero';
import { usePageData } from '../../hooks/usePageData';

export default function About() {
  const { data, loading } = usePageData('about');
  
  if (loading) return <div className="flex justify-center py-16">Loading...</div>;
  
  return (
    <div>
      <Hero data={data?.hero} />
      
      {/* Content Sections */}
      <section className="py-16">
        <div className="container mx-auto">
          {data?.content?.map((section) => (
            <div key={section.id} className="mb-12">
              <h2 className="text-3xl font-bold mb-4">{section.title}</h2>
              <p className="text-lg text-gray-700">{section.text}</p>
            </div>
          ))}
          
          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {data?.values?.map((value) => (
              <div key={value.id} className="text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}