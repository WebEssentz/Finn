export const DEMO_USAGE_KEY = 'hume_demo_used';
export const DEMO_TIMESTAMP_KEY = 'hume_demo_timestamp';

export const checkDemoUsage = (): boolean => {
  try {
    const demoUsed = localStorage.getItem(DEMO_USAGE_KEY);
    const timestamp = localStorage.getItem(DEMO_TIMESTAMP_KEY);
    
    if (demoUsed && timestamp) {
      const usedDate = new Date(parseInt(timestamp));
      const now = new Date();
      // Check if 2 years have passed
      if (now.getTime() - usedDate.getTime() < 63072000000) {
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
};

export const setDemoUsed = () => {
  try {
    localStorage.setItem(DEMO_USAGE_KEY, 'true');
    localStorage.setItem(DEMO_TIMESTAMP_KEY, Date.now().toString());
  } catch (err) {
    console.error('Failed to save demo usage:', err);
  }
};