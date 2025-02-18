import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function ProfilePage() {
  useDocumentTitle('Profile');

  return (
    <div>
      <h1>Profile</h1>
      {/* Add profile content here */}
    </div>
  );
}
