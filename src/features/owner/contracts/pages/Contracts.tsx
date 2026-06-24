import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

import StatusPill from '../../dashboard/pages/components/StatusPill';
import PageHeader from '../../dashboard/pages/components/PageHeader';

import { useUser } from '../../../../shared/auth/provider/useContextValue';
import type { Contract } from '../../../../shared/types/Contract';

import { getOwnerContracts } from '../../../../services/contract.service';
import { downloadContractPdf } from '../../../../services/pdf.service';
import { formatDate, formatPrice, getContractCode } from '../utils/formatters';
import { ContractTimeline } from '../components/ContractTimeLine';

const Contracts = () => {
  const { user } = useUser();

  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContractId, setSelectedContractId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchContracts = async () => {
      if (!user?.id) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await getOwnerContracts(user.id);

        setContracts(data);
        setSelectedContractId(data[0]?.id ?? null);
      } catch (error) {
        console.error('Error obteniendo contratos:', error);
        setErrorMessage('No pudimos cargar los contratos. Intentá nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, [user?.id]);

  const selectedContract =
    contracts.find((contract) => contract.id === selectedContractId) ?? contracts[0];

  return (
    <>
      <PageHeader
        title="Contratos"
        description="Consultá los contratos activos de tus propiedades y descargá sus documentos."
      />

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Cargando contratos...</p>
      ) : errorMessage ? (
        <p className="text-sm text-destructive">{errorMessage}</p>
      ) : contracts.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h2 className="font-semibold">Todavía no tenés contratos</h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Los contratos aparecerán acá cuando un inquilino solicite una de tus propiedades
            disponibles.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card shadow-soft lg:col-span-2">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-5 py-3 text-left">Contrato</th>
                    <th className="px-5 py-3 text-left">Propiedad</th>
                    <th className="px-5 py-3 text-left">Inquilino</th>
                    <th className="px-5 py-3 text-left">Vigencia</th>
                    <th className="px-5 py-3 text-left">Monto</th>
                    <th className="px-5 py-3 text-left">Estado</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>

                <tbody className="divide-y divide-border">
                  {contracts.map((contract) => {
                    const isSelected = contract.id === selectedContract?.id;

                    return (
                      <tr
                        key={contract.id}
                        className={isSelected ? 'bg-secondary/30' : 'hover:bg-secondary/30'}
                      >
                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() => setSelectedContractId(contract.id)}
                            className="font-medium transition hover:text-primary hover:underline"
                          >
                            {getContractCode(contract.id)}
                          </button>
                        </td>

                        <td className="px-5 py-4">{contract.property.title}</td>

                        <td className="px-5 py-4">{contract.tenant.fullName}</td>

                        <td className="px-5 py-4 text-muted-foreground">
                          {formatDate(contract.startDate)} → {formatDate(contract.endDate)}
                        </td>

                        <td className="px-5 py-4 font-medium">
                          {formatPrice(contract.monthlyAmount)}
                        </td>

                        <td className="px-5 py-4">
                          <StatusPill tone="success">Activo</StatusPill>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => downloadContractPdf(contract)}
                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
                          >
                            <Download className="h-3.5 w-3.5" />
                            PDF
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {selectedContract && <ContractTimeline contract={selectedContract} />}
        </div>
      )}
    </>
  );
};

export default Contracts;
