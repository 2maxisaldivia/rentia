import { ArrowUpRight } from 'lucide-react';
import { activity } from '../../utils/constants';
import StatusPill from './StatusPill';

const Activity = () => {
  return (
    <div className="mt-6 rounded-2xl border bg-white shadow">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="font-semibold">Actividad reciente</h2>

        <button
          className="
        flex items-center gap-1
        rounded-md
        px-3 py-1.5
        text-sm
        hover:bg-gray-100
      "
        >
          Ver todo
          <ArrowUpRight className="h-3.5 w-3.5" />
        </button>
      </div>

      <ul className="divide-y">
        {activity.map((a, i) => (
          <li
            key={i}
            className="
          flex items-center gap-4
          px-6 py-4
        "
          >
            <StatusPill tone={a.tone}>{a.who}</StatusPill>

            <p className="flex-1 truncate text-sm">
              <span className="text-gray-500">{a.action}</span>{' '}
              <span className="font-medium">{a.target}</span>
            </p>

            <span className="text-xs text-gray-500">{a.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default Activity;
