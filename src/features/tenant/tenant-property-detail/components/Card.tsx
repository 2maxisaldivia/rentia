const Card = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <section
      className="
        rounded-2xl
        border border-border
        bg-card
        p-6
        shadow-soft
      "
    >
      <h3 className="font-semibold">{title}</h3>

      <div className="mt-4">{children}</div>
    </section>
  );
};

export default Card;
