import { mainActors } from '../utils/constants';

const ForWhoSection = () => {
  return (
    <section
      id="para-quien"
      className="border-t border-border/60 bg-primary text-primary-foreground"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-3 lg:px-8">
        {mainActors.map((u) => (
          <div key={u.title}>
            <h3 className="text-xl font-semibold">{u.title}</h3>
            <p className="mt-2 text-sm text-primary-foreground/70">{u.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ForWhoSection;
