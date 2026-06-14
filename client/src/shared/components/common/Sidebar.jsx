import { useState } from 'react';
import { Menu, X } from 'lucide-react';

import { navbarLinks } from '@/shared/utils/data.jsx';

import SidebarLink from './SidebarLink.jsx';
import SearchBar from '../custom/SearchBar.jsx';

import sideBarLogo from '@/assets/sidebarLogo.png';
import { Separator } from '../ui/separator.jsx';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarSearch, setSidebarSearch] = useState('');

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const filteredLinks = navbarLinks.filter((link) => link.name.toLowerCase().includes(sidebarSearch.toLowerCase()));

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-[60] rounded-lg bg-[#1D222B] p-2 text-white shadow-lg lg:hidden"
      >
        <Menu size={20} />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[1px] lg:hidden" onClick={closeSidebar} />
      )}

      <aside
        className={`border-borderColor fixed inset-y-0 left-0 z-50 w-[280px] max-w-[85vw] border-r transition-transform duration-300 ease-in-out lg:w-64 lg:max-w-none lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(180deg, #1D222B 0%, #1B2130 100%)',
        }}
      >
        {/* Mobile Close Button */}
        <button type="button" onClick={closeSidebar} className="absolute top-4 right-4 text-white lg:hidden">
          <X size={20} />
        </button>

        {/* Logo */}
        <header className="px-5 py-6">
          <img src={sideBarLogo} alt="Productr Logo" className="h-auto max-w-full" />
        </header>

        {/* Search */}
        <section className="px-3">
          <SearchBar
            value={sidebarSearch}
            onChange={setSidebarSearch}
            onClear={() => setSidebarSearch('')}
            placeholder="Search menu..."
            variant="dark"
          />
        </section>

        <Separator className="bg-borderColor/50 my-4" />

        {/* Navigation */}
        <nav aria-label="Main Navigation" className="px-3">
          <ul className="space-y-2">
            {filteredLinks.map((link) => (
              <SidebarLink key={link.path} path={link.path} Icon={link.Icon} name={link.name} onClick={closeSidebar} />
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
