import { useEffect } from 'react';

interface DocumentTitleProps {
  title: string;
}

export const DocumentTitle = ({ title }: DocumentTitleProps) => {
  useEffect(() => {
    // Save the original title
    const originalTitle = document.title;
    // Set the new title
    document.title = `${title} | BidHub`;

    // Restore the original title on unmount
    return () => {
      document.title = originalTitle;
    };
  }, [title]);

  return null;
};
