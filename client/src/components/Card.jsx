export default function Card({ title, children }) {
  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}
