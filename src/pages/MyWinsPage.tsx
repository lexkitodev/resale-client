import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function MyWinsPage() {
  useDocumentTitle('My Wins');

  return (
    <div>
      <h1>My Wins</h1>
      {/* Add won items listing content here */}
    </div>
  );
}
