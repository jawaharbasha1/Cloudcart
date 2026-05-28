export default function LoadingSkeleton({ rows = 3, type = 'card' }) {
  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-bg-card rounded-2xl border border-border p-5 space-y-3">
            <div className="flex justify-between">
              <div className="w-10 h-10 rounded-xl skeleton" />
              <div className="w-16 h-6 rounded-lg skeleton" />
            </div>
            <div className="w-24 h-8 rounded skeleton" />
            <div className="w-20 h-4 rounded skeleton" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 bg-bg-card rounded-xl border border-border">
          <div className="w-10 h-10 rounded-lg skeleton" />
          <div className="flex-1 space-y-2">
            <div className="w-1/3 h-4 rounded skeleton" />
            <div className="w-1/2 h-3 rounded skeleton" />
          </div>
          <div className="w-20 h-6 rounded-lg skeleton" />
        </div>
      ))}
    </div>
  );
}
