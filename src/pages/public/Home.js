// src/pages/public/Home.js
// Updated to ensure proper Motive-style hero sections

import React, { useEffect } from 'react';
import Hero from '../../components/shared/Hero';
import { usePageData } from '../../hooks/usePageData';
import { runMigration } from '../../utils/migrateHeroData';

export default function Home() {
  const { data, loading, refetch } = usePageData('home');
  
  // Ensure migration runs when component mounts
  useEffect(() => {
    // Check if hero sections are missing and trigger migration
    if (data && (!data.hero?.sections || data.hero.sections.length === 0)) {
      console.log('🔧 Home page: Hero sections missing, running migration...');
      const migrated = runMigration(false);
      
      if (migrated) {
        // Refetch data after migration
        setTimeout(() => {
          refetch();
        }, 100);
      }
    }
  }, [data, refetch]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your workspace...</p>
        </div>
      </div>
    );
  }
  
  // Debug logging
  console.log('Home page data:', data);
  console.log('Hero sections:', data?.hero?.sections);
  
  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <Hero 
        data={data?.hero} 
        isEditable={false} 
        pageId="home"
      />
      
      {/* Features Section */}
      {data?.sections?.features && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {data.sections.features.title}
              </h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {data.sections.features.items?.map((feature) => (
                <div key={feature.id} className="text-center group">
                  <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                    <span className="text-3xl">{feature.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              Take the first step towards a more productive and connected work experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Start Your Journey
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-200">
                Schedule a Tour
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Proof Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <p className="text-gray-600 mb-8 text-lg">
              Trusted by professionals from leading companies
            </p>
            <div className="flex items-center justify-center space-x-16 opacity-50">
              {/* Company logos placeholder - replace with actual logos */}
              <div className="text-gray-400 font-bold text-lg">TechCorp</div>
              <div className="text-gray-400 font-bold text-lg">StartupCo</div>
              <div className="text-gray-400 font-bold text-lg">DesignPro</div>
              <div className="text-gray-400 font-bold text-lg">DevStudio</div>
              <div className="text-gray-400 font-bold text-lg">CreativeInc</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}