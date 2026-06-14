import SignupForm from '../components/SignupForm.jsx';
import { Link } from 'react-router-dom';

const SignupPage = () => {
  return (
    <div className="flex h-full flex-col justify-between py-40">
      {/* Top Section */}
      <div className="space-y-8">
        <h1 className="text-textBlue text-2xl font-semibold">Create your Productr Account</h1>
        <SignupForm />
      </div>

      {/* Bottom Section */}
      <div className="border bg-white p-6 text-center">
        <p className="text-sm text-slate-500">I have a Productr Account?</p>

        <Link to="/login" className="text-btnBlue font-medium hover:underline">
          Login Here
        </Link>
      </div>
    </div>
  );
};

export default SignupPage;
