// ============================================================================
// src/hooks/usePageData.js - Page Content Management Hook
// ============================================================================

import { useState, useEffect, useCallback } from 'react';
import { getPageContent } from '../services/api';

export default function usePageData(pageId, isDraft = false) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const pageData = await getPageContent(pageId, isDraft);
      setData(pageData);
    } catch (err) {
      setError(err.message);
      console.error(`Error loading ${pageId} page data:`, err);
    } finally {
      setLoading(false);
    }
  }, [pageId, isDraft]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { 
    data, 
    loading, 
    error,
    refetch: fetchData,
    // Helper methods for common operations
    isEmpty: !data || Object.keys(data).length === 0,
    hasContent: data && Object.keys(data).length > 0
  };
}
