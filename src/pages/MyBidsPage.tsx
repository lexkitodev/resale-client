import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function MyBidsPage() {
  useDocumentTitle('My Bids');

  return (
    <div>
      <h1>My Bids</h1>
      {/* Add bid listing content here */}
    </div>
  );
}
