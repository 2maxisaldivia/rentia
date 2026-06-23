import { Outlet } from 'react-router-dom';
import TenantNavPanel from '../layouts/tenant/TenantNavPanel';

export default function TenantLayout() {
  return (
    <>
      <TenantNavPanel />
      <Outlet />
    </>
  );
}
