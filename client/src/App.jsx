import { Suspense } from 'react';
import CustomSpinner from './shared/components/custom/CustomSpinner.jsx';
import { Outlet } from 'react-router-dom';
import AuthChecker from './shared/components/common/AuthChecker.jsx';
const App = () => {
  return (
    <>
      <AuthChecker />
      <Suspense fallback={<CustomSpinner />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default App;
