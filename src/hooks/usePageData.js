import { useState, useEffect } from 'react';
import { getPageData, savePageData, publishPageData } from '../services/api';
import toast from 'react-hot-toast';

export function usePageData(pageId) {
  const [data, setData] = useState(null);
  const [draft, setDraft] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (pageId) {
      loadPageData();
    }
  }, [pageId]);

  const loadPageData = async () => {
    try {
      setLoading(true);
      const pageData = await getPageData(pageId);
      setData(pageData);
      setDraft(pageData);
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to load page data:', error);
      toast.error('Failed to load page data');
    } finally {
      setLoading(false);
    }
  };

  const updateField = (path, value) => {
    const newDraft = { ...draft };
    const keys = path.split('.');
    let current = newDraft;
    
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) current[keys[i]] = {};
      current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
    setDraft(newDraft);
    setHasChanges(true);
  };

  const save = async () => {
    if (!hasChanges) {
      toast.success('No changes to save');
      return;
    }

    setSaving(true);
    try {
      await savePageData(pageId, draft);
      toast.success('Changes saved!');
      setHasChanges(false);
    } catch (error) {
      console.error('Failed to save:', error);
      toast.error('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const publish = async () => {
    setSaving(true);
    try {
      await publishPageData(pageId, draft);
      setData(draft);
      setHasChanges(false);
      toast.success('Published successfully!');
    } catch (error) {
      console.error('Failed to publish:', error);
      toast.error('Failed to publish');
    } finally {
      setSaving(false);
    }
  };

  const revert = () => {
    if (!hasChanges) {
      toast.success('No changes to revert');
      return;
    }
    setDraft(data);
    setHasChanges(false);
    toast.success('Changes reverted');
  };

  return {
    data,
    draft,
    loading,
    saving,
    hasChanges,
    updateField,
    save,
    publish,
    revert,
    reload: loadPageData
  };
}