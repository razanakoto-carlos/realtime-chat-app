export default function CheckIcon({ double = false }) {
  return (
    <span className="text-gray-400 text-xs ml-1">{double ? "✓✓" : "✓"}</span>
  );
}