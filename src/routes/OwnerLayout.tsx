import { Outlet } from 'react-router-dom';
import NavPanel from '../layouts/owner/OwnerNavPanel';

export default function OwnerLayout() {
  return (
    <>
      <NavPanel />
      <Outlet />
    </>
  );
}
