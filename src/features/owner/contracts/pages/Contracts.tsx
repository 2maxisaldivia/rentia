import { useEffect, useRef, useState } from 'react';
import { Download } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  const timelineRef = useRef<HTMLDivElement>(null);

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

  const handleViewTimeline = (contractId: string) => {
    setSelectedContractId(contractId);

    window.requestAnimationFrame(() => {
      timelineRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

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
        <div className="grid min-w-0 gap-6 lg:grid-cols-3">
          <div className="min-w-0 overflow-hidden rounded-2xl border border-border bg-card shadow-soft lg:col-span-2">
            <div className="divide-y divide-border md:hidden">
              {contracts.map((contract) => {
                const isSelected = contract.id === selectedContract?.id;

                return (
                  <article key={contract.id} className={isSelected ? 'bg-secondary/30 p-4' : 'p-4'}>
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedContractId(contract.id)}
                        className="text-left font-medium transition hover:text-primary hover:underline"
                      >
                        {getContractCode(contract.id)}
                      </button>

                      <StatusPill tone="success">Activo</StatusPill>
                    </div>

                    <dl className="mt-4 grid gap-3 text-sm">
                      <div>
                        <dt className="text-xs text-muted-foreground">Propiedad</dt>
                        <dd className="break-words font-medium">{contract.property.title}</dd>
                      </div>

                      <div>
                        <dt className="text-xs text-muted-foreground">Inquilino</dt>
                        <dd className="break-words">
                          <Link
                            to={`/owner/contracts/${contract.id}/tenant`}
                            className="font-medium text-primary transition hover:underline"
                          >
                            {contract.tenant.fullName}
                          </Link>
                        </dd>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <dt className="text-xs text-muted-foreground">Vigencia</dt>
                          <dd className="mt-0.5 text-xs">
                            {formatDate(contract.startDate)}
                            <span className="block text-muted-foreground">
                              hasta {formatDate(contract.endDate)}
                            </span>
                          </dd>
                        </div>

                        <div>
                          <dt className="text-xs text-muted-foreground">Monto</dt>
                          <dd className="break-words font-medium">
                            {formatPrice(contract.monthlyAmount)}
                          </dd>
                        </div>
                      </div>
                    </dl>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => handleViewTimeline(contract.id)}
                        className="rounded-md border border-border px-3 py-2 text-sm font-medium transition hover:bg-accent"
                      >
                        Ver timeline
                      </button>

                      <button
                        type="button"
                        onClick={() => downloadContractPdf(contract)}
                        className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
                      >
                        <Download className="h-3.5 w-3.5" />
                        Descargar PDF
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="min-w-[58rem] w-full text-sm">
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

                        <td className="px-5 py-4">
                          <Link
                            to={`/owner/contracts/${contract.id}/tenant`}
                            className="font-medium text-primary transition hover:underline"
                          >
                            {contract.tenant.fullName}
                          </Link>
                        </td>

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

          {selectedContract && (
            <div ref={timelineRef} className="min-w-0 scroll-mt-20">
              <ContractTimeline contract={selectedContract} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Contracts;
