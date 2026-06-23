const MiniBars = () => {
  const data = [42, 58, 51, 70, 65, 82];
  const max = Math.max(...data);
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'];
  return (
    <div className="mt-6 flex h-44 items-end gap-3">
      {data.map((v, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-2">
          <div
            className="w-full rounded-t-md bg-gradient-to-t from-primary/80 to-primary/40 transition-all"
            style={{ height: `${(v / max) * 100}%` }}
          />
          <span className="text-xs text-muted-foreground">{months[i]}</span>
        </div>
      ))}
    </div>
  );
};

export default MiniBars;
