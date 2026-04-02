

export function MarqueeBar() {
  const stats = [
    { label: "1200+ Students", highlight: true },
    { label: "10 Subjects" },
    { label: "First Year B.E." },
    { label: "Premium Notes" },
    { label: "PYQs Solved" },
    { label: "Updated Regularly" }
  ];

  // Duplicate the items intentionally to allow css marquee infinite loop without jumping
  const marqueeItems = [...stats, ...stats, ...stats, ...stats];

  return (
    <div className="w-full py-8 border-y border-border overflow-hidden bg-[var(--color-bg-warm)]">
      <div className="flex animate-marquee min-w-max">
        <div className="flex items-center gap-12 pr-12">
          {marqueeItems.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <span className={`font-display font-bold text-lg whitespace-nowrap ${item.highlight ? 'text-primary' : 'text-muted-foreground'}`}>
                {item.label}
              </span>
              <div className="w-2 h-2 rounded-full bg-sage opacity-50" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
