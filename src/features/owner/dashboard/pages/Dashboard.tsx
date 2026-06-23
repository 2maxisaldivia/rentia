import { Link } from 'react-router-dom';

import { Calendar, Plus } from 'lucide-react';
import PageHeader from './components/PageHeader';
import StatsSection from './components/StatsSection';
import Incomes from './components/IncomesSection';
import UpcomingSection from './components/UpcomingSection';
import Activity from './components/Activity';
import { ROUTES } from '../../../../shared/routes';

const Dashboard = () => {
  return (
    <>
      <PageHeader
        title="Hola, Lucía 👋"
        description="Acá tenés un resumen de tus alquileres."
        actions={
          <>
            <button
              className="
            flex items-center gap-2
            rounded-lg border
            px-4 py-2
            text-sm
            hover:bg-gray-100
            "
            >
              <Calendar size={16} />
              Este mes
            </button>

            <Link
              to={ROUTES.OWNER_PROPERTIES}
              className="
          flex items-center gap-2
          rounded-lg
          bg-black text-white
          px-4 py-2
          text-sm
          hover:bg-gray-800
          "
            >
              <Plus size={16} />
              Agregar propiedad
            </Link>
          </>
        }
      />

      <StatsSection />
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Incomes />
        <UpcomingSection />
      </div>

      <Activity />
    </>
  );
};

export default Dashboard;
