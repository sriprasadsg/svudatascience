const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const technologies = [
  { name: "Python", src: `${DI}/python/python-original.svg` },
  { name: "Pandas", src: `${DI}/pandas/pandas-original.svg` },
  { name: "NumPy", src: `${DI}/numpy/numpy-original.svg` },
  { name: "Jupyter", src: `${DI}/jupyter/jupyter-original.svg` },
  { name: "scikit-learn", src: `${DI}/scikitlearn/scikitlearn-original.svg` },
  { name: "TensorFlow", src: `${DI}/tensorflow/tensorflow-original.svg` },
  { name: "PyTorch", src: `${DI}/pytorch/pytorch-original.svg` },
  { name: "SQL", src: `${DI}/azuresqldatabase/azuresqldatabase-original.svg` },
  { name: "MySQL", src: `${DI}/mysql/mysql-original.svg` },
  { name: "Hadoop", src: `${DI}/hadoop/hadoop-original.svg` },
  { name: "Spark", src: `${DI}/apachespark/apachespark-original.svg` },
  { name: "Git", src: `${DI}/git/git-original.svg` },
  { name: "Docker", src: `${DI}/docker/docker-original.svg` },
  { name: "AWS", src: `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
  { name: "Azure", src: `${DI}/azure/azure-original.svg` },
  { name: "Google Cloud", src: `${DI}/googlecloud/googlecloud-original.svg` },
];

export function TechStrip({ compact = false, vertical = false }: { compact?: boolean; vertical?: boolean }) {
  if (vertical) {
    return (
      <aside className="min-w-0 rounded-lg border border-border bg-card p-5" aria-labelledby="technology-heading">
        <h3 id="technology-heading" className="mb-5 text-base font-normal leading-relaxed">Tools &amp; technologies you will work with</h3>
        <div tabIndex={0} role="region" aria-label="Tools and technologies" className="max-h-[480px] overflow-y-auto overscroll-contain pr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring max-lg:max-h-80">
          <ul className="flex flex-col gap-3 py-1">
            {technologies.map((technology) => (
              <li key={technology.name} className="tech-tile flex min-h-16 shrink-0 items-center gap-4 border-b border-border px-2 py-3 last:border-0">
                <img src={technology.src} alt="" className="h-9 w-9 shrink-0 object-contain" />
                <span className="min-w-0 text-sm text-muted-foreground">{technology.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    );
  }
  const loop = [...technologies, ...technologies];
  return (
    <div className={compact ? "mt-10" : "mt-14"}>
      <p className="mb-5 text-center text-sm font-medium text-primary">Tools &amp; technologies you will work with</p>
      <div className="tech-marquee overflow-hidden">
        <ul className={`tech-track flex w-max gap-4`}>
          {loop.map((t, i) => (
            <li key={i} aria-hidden={i >= technologies.length} className={`tech-tile soft-lift flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-card ${compact ? "h-20 w-28" : "h-24 w-36"}`}>
              <img src={t.src} alt={t.name} className={`object-contain ${compact ? "h-8 w-8" : "h-10 w-10"}`} />
              <span className="text-xs text-muted-foreground">{t.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
