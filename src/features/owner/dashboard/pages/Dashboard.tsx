import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

import PageHeader from './components/PageHeader';
import StatsSection from './components/StatsSection';
import Incomes from './components/IncomesSection';
import UpcomingSection from './components/UpcomingSection';
import Activity from './components/Activity';

import { ROUTES } from '../../../../shared/routes';
import { useUser } from '../../../../shared/auth/provider/useContextValue';

import { getOwnerProperties, type Property } from '../../../../services/property.service';

import { getOwnerContracts } from '../../../../services/contract.service';
import type { Contract } from '../../../../shared/types/Contract';

type IncomePoint = {
  label: string;
  value: number;
};

const DEMO_OPEN_CLAIMS = 4;

const getLocalIsoDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const formatMonth = (date: Date) => {
  const month = new Intl.DateTimeFormat('es-AR', {
    month: 'short',
  })
    .format(date)
    .replace('.', '');

  return month.charAt(0).toUpperCase() + month.slice(1);
};

const getIncomeProjection = (contracts: Contract[]): IncomePoint[] => {
  const today = new Date();

  return Array.from({ length: 6 }, (_, index) => {
    const monthStart = new Date(today.getFullYear(), today.getMonth() + index, 1);

    const monthEnd = new Date(today.getFullYear(), today.getMonth() + index + 1, 0);

    const monthStartIso = getLocalIsoDate(monthStart);
    const monthEndIso = getLocalIsoDate(monthEnd);

    const value = contracts
      .filter((contract) => contract.startDate <= monthEndIso && contract.endDate >= monthStartIso)
      .reduce((total, contract) => total + contract.monthlyAmount, 0);

    return {
      label: formatMonth(monthStart),
      value,
    };
  });
};

const Dashboard = () => {
  const { user } = useUser();

  const [properties, setProperties] = useState<Property[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchDashboardData = async () => {
      if (!user?.id) {
        if (isMounted) {
          setIsLoading(false);
        }

        return;
      }

      setIsLoading(true);
      setErrorMessage('');

      try {
        const [ownerProperties, ownerContracts] = await Promise.all([
          getOwnerProperties(user.id),
          getOwnerContracts(user.id),
        ]);

        if (!isMounted) {
          return;
        }

        setProperties(ownerProperties);
        setContracts(ownerContracts);
      } catch (error) {
        console.error('Error cargando dashboard:', error);

        if (isMounted) {
          setErrorMessage('No pudimos cargar el resumen de tus alquileres.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchDashboardData();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const activeContracts = useMemo(
    () => contracts.filter((contract) => contract.status === 'active'),
    [contracts],
  );

  const availableProperties = useMemo(
    () => properties.filter((property) => property.status === 'available').length,
    [properties],
  );

  const rentedProperties = useMemo(
    () => properties.filter((property) => property.status === 'rented').length,
    [properties],
  );

  const monthlyIncome = useMemo(
    () => activeContracts.reduce((total, contract) => total + contract.monthlyAmount, 0),
    [activeContracts],
  );

  const incomeProjection = useMemo(() => getIncomeProjection(activeContracts), [activeContracts]);

  return (
    <>
      <PageHeader
        title={`Hola, ${user?.firstName ?? 'propietario'} 👋`}
        description="Acá tenés un resumen de tus alquileres."
        actions={
          <Link
            to={ROUTES.OWNER_PROPERTY_CREATE}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              bg-primary
              px-4
              py-2
              text-sm
              font-medium
              text-primary-foreground
              transition
              hover:opacity-90
            "
          >
            <Plus className="h-4 w-4" />
            Agregar propiedad
          </Link>
        }
      />

      {isLoading ? (
        <p className="mt-6 text-sm text-muted-foreground">Cargando resumen...</p>
      ) : errorMessage ? (
        <p className="mt-6 text-sm text-destructive">{errorMessage}</p>
      ) : (
        <>
          <StatsSection
            totalProperties={properties.length}
            availableProperties={availableProperties}
            rentedProperties={rentedProperties}
            activeContracts={activeContracts.length}
            monthlyIncome={monthlyIncome}
            openClaims={DEMO_OPEN_CLAIMS}
          />

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            <Incomes projection={incomeProjection} activeContracts={activeContracts.length} />

            <UpcomingSection contracts={activeContracts} />
          </div>

          <Activity contracts={activeContracts} />
        </>
      )}
    </>
  );
};

export default Dashboard;
