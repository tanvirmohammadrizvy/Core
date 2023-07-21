import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'brands', element: <BrandList to="brands" /> },
        { path: 'brands/create', element: <BrandCreate /> }, 
        { path: 'brands/:id', element: <EditBrand /> }, 
      ],
    },
    
  ]);
}


const NotFound = Loadable(lazy(() => import('../pages/Page404')));

// Brand Section
const BrandList = Loadable(lazy(() => import('../pages/Brand/List')))
const BrandCreate = Loadable(lazy(() => import('../pages/Brand/Create')))
const EditBrand = Loadable(lazy(() => import('../pages/Brand/Edit')))
