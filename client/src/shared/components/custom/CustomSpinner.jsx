import { Spinner } from '../ui/spinner';

const CustomSpinner = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-xl">
        <Spinner />
        Loading...
      </div>
    </div>
  );
};

export default CustomSpinner;
