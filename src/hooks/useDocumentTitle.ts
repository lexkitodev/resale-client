import { useEffect } from 'react';

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const originalTitle = document.title;
    document.title = `${title} | BidHub`;

    return () => {
      document.title = originalTitle;
    };
  }, [title]);
};
