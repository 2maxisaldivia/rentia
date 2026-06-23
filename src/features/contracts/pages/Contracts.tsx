import { Download, FileText, Plus } from 'lucide-react';
import StatusPill from '../../dashboard/pages/components/StatusPill';
import PageHeader from '../../dashboard/pages/components/PageHeader';
import { rows } from '../utils/constants';

const Contracts = () => {
  return (
    <>
      <PageHeader
        title="Contratos"
        description="Gestioná altas, vencimientos y descargás contratos firmados."
        actions={
          <button
            className="
            flex
          rounded-md
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
            <Plus className="h-4 w-4 mr-1.5 mt-0.5" />
            Nuevo contrato
          </button>
        }
      />

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
                {rows.map((r) => (
                  <tr key={r.id} className="hover:bg-secondary/30">
                    <td className="px-5 py-4 font-medium">{r.id}</td>

                    <td className="px-5 py-4">{r.prop}</td>

                    <td className="px-5 py-4">{r.tenant}</td>

                    <td className="px-5 py-4 text-muted-foreground">
                      {r.start} → {r.end}
                    </td>

                    <td className="px-5 py-4 font-medium">{r.amount}</td>

                    <td className="px-5 py-4">
                      <StatusPill tone={r.tone}>{r.status}</StatusPill>
                    </td>

                    <td className="px-5 py-4 text-right">
                      {/* Button ghost */}
                      <button
                        className="
                      inline-flex
                      items-center
                      gap-1
                      rounded-md
                      px-2
                      py-1
                      text-sm
                      font-medium
                      transition
                      hover:bg-accent
                      hover:text-accent-foreground
                    "
                      >
                        <Download className="h-3.5 w-3.5" />
                        PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-semibold">Timeline · C-1023</h3>

          <p className="text-xs text-muted-foreground">Corrientes 1234 · Juan Pérez</p>

          <ol className="relative mt-5 space-y-5 border-l border-border pl-5">
            {[
              {
                t: 'Contrato firmado',
                d: '01/03/2025',
                tone: 'success' as const,
              },
              {
                t: 'Pago de mes 1 acreditado',
                d: '05/03/2025',
                tone: 'success' as const,
              },
              {
                t: 'Actualización por IPC',
                d: '01/09/2025',
                tone: 'primary' as const,
              },
              {
                t: 'Vencimiento final',
                d: '01/03/2027',
                tone: 'muted' as const,
              },
            ].map((e, i) => (
              <li key={i}>
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
                  e.tone === 'success'
                    ? 'bg-success'
                    : e.tone === 'primary'
                      ? 'bg-primary'
                      : 'bg-muted-foreground'
                }
              `}
                />

                <p className="text-sm font-medium">{e.t}</p>

                <p className="text-xs text-muted-foreground">{e.d}</p>
              </li>
            ))}
          </ol>

          {/* Button outline */}
          <button
            className="
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-md
          border
          border-border
          bg-background
          px-4
          py-2
          text-sm
          font-medium
          transition
          hover:bg-accent
        "
          >
            <FileText className="h-4 w-4" />
            Generar PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default Contracts;
