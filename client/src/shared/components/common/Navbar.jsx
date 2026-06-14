/* eslint-disable react-hooks/set-state-in-effect */
import { useLocation } from 'react-router-dom';
import { useQueryState } from 'nuqs';
import { useState, useEffect } from 'react';

import ProfileDropdown from './ProfileDropdown';
import SearchBar from '../custom/SearchBar';

const Navbar = () => {
  const location = useLocation();
  const showSearch = location.pathname === '/products';

  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    shallow: false,
  });

  const [inputValue, setInputValue] = useState(search);

  useEffect(() => {
    setInputValue(search);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== search) {
        setSearch(inputValue || null);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, search, setSearch]);

  return (
    <header
      className="sticky top-0 z-40 h-14 border-b border-[#E4E7EC] shadow-sm md:h-16"
      style={{
        background: 'linear-gradient(90deg, #FFE8E6 0%, #FEFFCD 50%, #9AADF9 100%)',
      }}
    >
      <div className="flex h-full items-center justify-between gap-3 px-4 md:px-6">
        <div className="flex flex-1 justify-end">
          {showSearch && (
            <div className="w-full max-w-55 sm:max-w-xs md:max-w-md">
              <SearchBar
                value={inputValue}
                onChange={setInputValue}
                onClear={() => {
                  setInputValue('');
                  setSearch(null);
                }}
                placeholder="Search products..."
                variant="light"
              />
            </div>
          )}
        </div>

        <ProfileDropdown />
      </div>
    </header>
  );
};

export default Navbar;
