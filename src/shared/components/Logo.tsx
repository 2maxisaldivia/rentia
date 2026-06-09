import { Link } from 'react-router-dom';
import { Building2 } from 'lucide-react';

export function Logo() {
  return (
    <Link to="/" className={`inline-flex items-center gap-2 font-semibold tracking-tight`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground shadow-soft">
        <Building2 className="h-4 w-4" />
      </span>
      <span className="text-foreground">
        Rentia<span className="text-primary">.</span>
      </span>
    </Link>
  );
}
