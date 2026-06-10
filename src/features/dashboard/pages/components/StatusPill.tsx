type Tone = 'success' | 'warning' | 'destructive' | 'muted' | 'primary';

const styles: Record<Tone, string> = {
  success: 'bg-green-100 text-green-700 border-green-200',

  warning: 'bg-yellow-100 text-yellow-700 border-yellow-200',

  destructive: 'bg-red-100 text-red-700 border-red-200',

  muted: 'bg-gray-100 text-gray-600 border-gray-200',

  primary: 'bg-blue-100 text-blue-700 border-blue-200',
};

const StatusPill = ({
  tone = 'muted',
  children,
  className = '',
}: {
  tone?: Tone;
  children: React.ReactNode;
  className?: string;
}) => {
  const dotColor = {
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    destructive: 'bg-red-500',
    primary: 'bg-blue-500',
    muted: 'bg-gray-500',
  }[tone];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        rounded-full border
        px-2.5 py-0.5
        text-xs font-medium
        ${styles[tone]}
        ${className}
      `}
    >
      <span
        className={`
          h-1.5 w-1.5
          rounded-full
          ${dotColor}
        `}
      />

      {children}
    </span>
  );
};

export default StatusPill;
