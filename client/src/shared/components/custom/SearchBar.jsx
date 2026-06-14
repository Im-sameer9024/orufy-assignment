import { Search, X } from 'lucide-react';

const SearchBar = ({
  value = '',
  onChange = () => {},
  onClear = () => {},
  placeholder = 'Search...',
  variant = 'light',
}) => {
  const isDark = variant === 'dark';

  return (
    <div
      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 transition-all ${
        isDark
          ? 'border border-transparent bg-[#2A303C] text-white focus-within:border-gray-600'
          : 'focus-within:border-btnBlue/50 focus-within:ring-btnBlue/20 border border-gray-200 bg-white/80 text-gray-800 shadow-xs backdrop-blur-xs focus-within:ring-1'
      }`}
    >
      <Search size={16} className={isDark ? 'text-gray-400' : 'text-gray-500'} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full bg-transparent text-sm outline-none ${
          isDark ? 'text-white placeholder:text-gray-400' : 'text-gray-800 placeholder:text-gray-400'
        }`}
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className={`transition-transform hover:scale-110 active:scale-95 ${
            isDark ? 'text-gray-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
