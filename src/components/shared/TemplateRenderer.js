import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { usePageTemplate } from '../../hooks/useTemplateSettings'; // CORRECT import path
import { templateRegistry, templateExists } from '../../pageTemplates/templateRegistry';

function TemplateLoadingState() {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading template...</p>
      </div>
    </div>
  );
}

function TemplateErrorState({ pageId, templateId, error }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
      <div className="text-red-600 mb-4">
        <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 16.5c-.77.833-.232 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Template Error</h3>
      <p className="text-red-600 mb-4">
        Failed to load template "{templateId}" for page "{pageId}"
      </p>
      <details className="text-left">
        <summary className="cursor-pointer text-red-700 font-medium mb-2">Error Details</summary>
        <pre className="text-sm text-red-600 bg-red-100 p-2 rounded overflow-auto">
          {error?.toString()}
        </pre>
      </details>
      <div className="mt-4">
        <button 
          onClick={() => window.location.reload()} 
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

export default function TemplateRenderer({ pageId, data, isEditable, onChange }) {
  const { template, isEnabled } = usePageTemplate(pageId);
  
  if (!isEnabled) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
        <h3 className="text-gray-600 font-semibold">Page Disabled</h3>
        <p className="text-gray-500">This page is currently disabled in settings.</p>
      </div>
    );
  }
  
  // For home page, use template system. For others, return null (let existing components handle it)
  if (pageId !== 'home') {
    return null;
  }
  
  // Check if template exists
  if (!templateExists(pageId, template)) {
    return (
      <TemplateErrorState 
        pageId={pageId} 
        templateId={template} 
        error={new Error(`Template "${template}" not found for page "${pageId}"`)}
      />
    );
  }
  
  const TemplateComponent = templateRegistry[pageId][template];
  
  if (!TemplateComponent) {
    return (
      <TemplateErrorState 
        pageId={pageId} 
        templateId={template} 
        error={new Error('Template component is null')}
      />
    );
  }
  
  return (
    <Suspense fallback={<TemplateLoadingState />}>
      <ErrorBoundary pageId={pageId} templateId={template}>
        <TemplateComponent 
          data={data} 
          isEditable={isEditable} 
          onChange={onChange} 
        />
      </ErrorBoundary>
    </Suspense>
  );
}

// Error boundary for template rendering errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Template rendering error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <TemplateErrorState 
          pageId={this.props.pageId} 
          templateId={this.props.templateId} 
          error={this.state.error}
        />
      );
    }

    return this.props.children;
  }
}

TemplateRenderer.propTypes = {
  pageId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  isEditable: PropTypes.bool.isRequired,
  onChange: PropTypes.func
};