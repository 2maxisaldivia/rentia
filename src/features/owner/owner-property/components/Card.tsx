const Card = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <h3 className="mb-3 font-semibold">{title}</h3>
      {children}
    </div>
  );
};
export default Card;
