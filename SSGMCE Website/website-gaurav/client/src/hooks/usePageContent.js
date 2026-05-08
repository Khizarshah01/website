import { useState, useEffect } from 'react';

// Simple dummy hook for compatibility with gaurav branch pages
// This returns static data instead of dynamic CMS content
const usePageContent = (pageId) => {
  const [state, setState] = useState({
    page: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setState({
        page: {
          id: pageId,
          title: 'Page Title',
          content: 'Static content - modify page directly in component',
          sections: []
        },
        loading: false,
        error: null
      });
    }, 100);

    return () => clearTimeout(timer);
  }, [pageId]);

  return state;
};

export default usePageContent;