const InfoItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="rounded-xl bg-secondary/50 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>

      <p className="mt-1 text-sm font-semibold">{value}</p>
    </div>
  );
};
export default InfoItem;
