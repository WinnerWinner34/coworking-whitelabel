// Storage-agnostic utilities that work with localStorage now, Firebase later

class StorageAdapter {
  constructor() {
    this.isFirebase = process.env.REACT_APP_USE_FIREBASE === 'true';
  }

  async getData(key) {
    if (this.isFirebase) {
      // TODO: Implement Firebase getter when ready
      const { getPageContent } = await import('../../services/api');
      return await getPageContent(key);
    } else {
      // localStorage implementation
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
  }

  async setData(key, value) {
    if (this.isFirebase) {
      // TODO: Implement Firebase setter when ready
      const { savePageContent } = await import('../../services/api');
      return await savePageContent(key, value);
    } else {
      // localStorage implementation
      localStorage.setItem(key, JSON.stringify(value));
      return Promise.resolve();
    }
  }

  async getAllKeys() {
    if (this.isFirebase) {
      // TODO: Implement Firebase key listing when ready
      return ['home', 'about', 'team', 'news', 'events'];
    } else {
      // localStorage implementation
      return Object.keys(localStorage).filter(key => 
        !key.startsWith('_') && 
        !key.includes('auth') &&
        !key.includes('settings')
      );
    }
  }
}

export const storage = new StorageAdapter();