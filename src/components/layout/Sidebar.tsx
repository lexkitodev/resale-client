import { Link, useParams } from 'react-router-dom';
import { useCategories } from '../../hooks/useCategories';
import { FaSpinner } from 'react-icons/fa';
import clsx from 'clsx';

export const Sidebar = () => {
  const { categories, isLoading, error } = useCategories();
  const { category: currentSlug } = useParams<{ category: string }>();

  if (isLoading) {
    return (
      <div className="p-4 flex justify-center">
        <FaSpinner className="w-6 h-6 animate-spin text-[#4169e1]" />
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-600 text-sm">Failed to load categories</div>;
  }

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="p-4">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Categories</h2>
        <nav className="space-y-1">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className={clsx(
                'block px-4 py-2 text-sm rounded-lg transition-colors',
                category.slug === currentSlug
                  ? 'bg-[#4169e1] text-white hover:bg-blue-700'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-[#4169e1]'
              )}
            >
              <div>{category.name}</div>
              {category.description && (
                <p
                  className={clsx(
                    'text-xs mt-0.5',
                    category.slug === currentSlug ? 'text-blue-100' : 'text-gray-500'
                  )}
                >
                  {category.description}
                </p>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};
