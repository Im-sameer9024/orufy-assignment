import { useLocation } from 'react-router-dom';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';

const Homebar = () => {
  const location = useLocation();

  const [tab, setTab] = useQueryState('tab');

  useEffect(() => {
    if (location.pathname === '/home' && !tab) {
      setTab('published');
    }
  }, [tab, setTab, location.pathname]);

  // Only show on /home
  if (location.pathname !== '/home') {
    return null;
  }

  return (
    <section className="w-full border-b border-[#E4E7EC] bg-white">
      <nav aria-label="Product Filter Tabs" className="flex items-center px-6">
        <button
          type="button"
          onClick={() => setTab('published')}
          className={`relative px-1 py-4 text-sm font-medium transition-colors ${
            tab === 'published' ? 'text-[#344054]' : 'text-[#98A2B3]'
          }`}
        >
          Published
          {tab === 'published' && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#3B82F6]" />}
        </button>

        <button
          type="button"
          onClick={() => setTab('unpublished')}
          className={`relative ml-8 px-1 py-4 text-sm font-medium transition-colors ${
            tab === 'unpublished' ? 'text-[#344054]' : 'text-[#98A2B3]'
          }`}
        >
          Unpublished
          {tab === 'unpublished' && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#3B82F6]" />}
        </button>
      </nav>
    </section>
  );
};

export default Homebar;
