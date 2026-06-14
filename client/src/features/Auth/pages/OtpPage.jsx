import OtpForm from '../components/OtpForm.jsx';

const OtpPage = () => {
  return (
    <div className="h-full py-40">
      {/* Top Section */}
      <div className="space-y-8">
        <h1 className="text-textBlue text-2xl font-semibold">Login to your Productr Account</h1>
        <OtpForm />
      </div>
    </div>
  );
};

export default OtpPage;
