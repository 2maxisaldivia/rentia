import { FileText } from 'lucide-react';
import { downloadContractPdf } from '../../../../services/pdf.service';
import type { Contract } from '../../../../shared/types/Contract';
import { formatDate, getContractCode } from '../utils/formatters';

export const ContractTimeline = ({ contract }: { contract: Contract }) => {
  const events = [
    {
      title: 'Contrato generado',
      date: formatDate(contract.createdAt),
      tone: 'success',
    },
    {
      title: 'Inicio de vigencia',
      date: formatDate(contract.startDate),
      tone: 'primary',
    },
    {
      title: 'Vencimiento final',
      date: formatDate(contract.endDate),
      tone: 'muted',
    },
  ] as const;

  return (
    <div className="min-w-0 rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-6">
      <h3 className="break-words font-semibold">
        Timeline · {getContractCode(contract.id)}
      </h3>

      <p className="mt-1 break-words text-xs text-muted-foreground">
        {contract.property.title} · Inquilino: {contract.tenant.fullName}
      </p>

      <ol className="relative mt-5 space-y-5 border-l border-border pl-5">
        {events.map((event) => (
          <li key={event.title}>
            <span
              className={`
                absolute
                -left-[7px]
                h-3.5
                w-3.5
                rounded-full
                border-2
                border-background
                ${
                  event.tone === 'success'
                    ? 'bg-success'
                    : event.tone === 'primary'
                      ? 'bg-primary'
                      : 'bg-muted-foreground'
                }
              `}
            />

            <p className="text-sm font-medium">{event.title}</p>

            <p className="text-xs text-muted-foreground">{event.date}</p>
          </li>
        ))}
      </ol>

      <button
        type="button"
        onClick={() => downloadContractPdf(contract)}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium transition hover:bg-accent"
      >
        <FileText className="h-4 w-4" />
        Generar PDF
      </button>
    </div>
  );
};
