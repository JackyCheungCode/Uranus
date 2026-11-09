export default function Loading() {
  return (
    <div role="status" aria-live="polite" aria-label="Loading page" className="mx-auto min-h-[60vh] max-w-[1440px] animate-pulse px-5 py-16 sm:px-8 lg:px-10">
      <span className="sr-only">Loading page content…</span>
      <div className="h-3 w-40 bg-surface-strong" />
      <div className="mt-6 h-12 max-w-xl bg-surface-strong" />
      <div className="mt-4 h-4 max-w-md bg-surface" />
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => <div key={index} className="aspect-[4/3] bg-surface" />)}
      </div>
    </div>
  );
}
