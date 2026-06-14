import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = () => {
  return (
    <div className="flex h-full flex-col justify-between py-40">
      {/* Top Section */}
      <div className="space-y-8">
        <h1 className="text-textBlue text-2xl font-semibold">Login to your Productr Account</h1>
        <LoginForm />
      </div>

      {/* Bottom Section */}
      <div className="border bg-white p-6 text-center">
        <p className="text-sm text-slate-500">Don't have a Productr Account?</p>

        <Link to="/signup" className="text-btnBlue font-medium hover:underline">
          SignUp Here
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
