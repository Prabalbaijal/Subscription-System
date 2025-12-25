export default function Container({ children }) {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      {children}
    </div>
  );
}
