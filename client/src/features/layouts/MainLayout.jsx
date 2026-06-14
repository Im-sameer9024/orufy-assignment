import { Outlet } from 'react-router-dom';

import Navbar from '@/shared/components/common/Navbar';
import Sidebar from '@/shared/components/common/Sidebar';
import Homebar from '@/features/Home/components/Homebar.jsx';

const MainLayout = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#F8F9FC]">
      <Sidebar />

      <div className="flex min-h-screen flex-col lg:ml-64">
        <Navbar />

        <Homebar />

        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
