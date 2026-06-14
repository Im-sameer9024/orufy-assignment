import { Outlet } from 'react-router-dom';
import authBanner from '../../assets/authlayout.png';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-slate-100">
      <div className="grid min-h-screen gap-8 p-5 md:grid-cols-2">
        {/* Left Side */}
        <div className="hidden md:flex">
          <img src={authBanner} alt="auth-banner" className="h-full w-full rounded-3xl object-cover" />
        </div>

        {/* Right Side */}
        <div className="flex items-center justify-center">
          <div className="h-full w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
