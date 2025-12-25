export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] 
                 transition text-white px-5 py-2 rounded-lg font-medium"
    >
      {children}
    </button>
  );
}
