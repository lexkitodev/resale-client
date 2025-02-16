import { useDocumentTitle } from '../hooks/useDocumentTitle';

export function SettingsPage() {
  useDocumentTitle('Settings');

  return (
    <div>
      <h1>Settings</h1>
      {/* Add settings content here */}
    </div>
  );
}
