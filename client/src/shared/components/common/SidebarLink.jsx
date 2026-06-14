import { NavLink } from 'react-router-dom';

const SidebarLink = ({ path, Icon, name, onClick }) => {
  return (
    <li>
      <NavLink
        to={path}
        end={path === '/home'}
        onClick={onClick}
        className={({ isActive }) =>
          `group flex items-center gap-3 rounded-lg px-4 py-1 text-sm font-medium transition-all duration-200 ${isActive ? 'text-white' : 'text-gray-400 hover:text-white'} `
        }
      >
        <span className="flex w-5 justify-center">{Icon}</span>

        <span>{name}</span>
      </NavLink>
    </li>
  );
};

export default SidebarLink;
