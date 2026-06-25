import { useEffect, useState } from 'react';

import { getTenantContracts } from '../../../../services/contract.service';
import { getPropertyById, type Property } from '../../../../services/property.service';
import { useUser } from '../../../../shared/auth/provider/useContextValue';
import type { Contract } from '../../../../shared/types/Contract';

export type TenantRental = {
  contract: Contract;
  property: Property | null;
};

export const useTenantRentals = () => {
  const { user } = useUser();

  const [rentals, setRentals] = useState<TenantRental[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchRentals = async () => {
      if (!user?.id) {
        if (isMounted) {
          setIsLoading(false);
        }

        return;
      }

      setIsLoading(true);
      setErrorMessage('');

      try {
        const contracts = await getTenantContracts(user.id);
        const activeContracts = contracts.filter((contract) => contract.status === 'active');
        const properties = await Promise.all(
          activeContracts.map((contract) => getPropertyById(contract.propertyId)),
        );

        if (!isMounted) {
          return;
        }

        setRentals(
          activeContracts.map((contract, index) => ({
            contract,
            property: properties[index],
          })),
        );
      } catch (error) {
        console.error('Error obteniendo los alquileres del inquilino:', error);

        if (isMounted) {
          setErrorMessage('No pudimos cargar los datos de tus alquileres.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchRentals();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  return {
    rentals,
    isLoading,
    errorMessage,
  };
};
