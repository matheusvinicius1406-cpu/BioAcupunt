export function EVASlider({ value, onChange }: { value: number, onChange: (v: number) => void }) {
  return (
    <div className="p-2 border rounded">
      <label>Dor (0-10): {value}</label>
      <input type="range" min="0" max="10" value={value} onChange={(e) => onChange(parseInt(e.target.value))} className="w-full" />
    </div>
  );
}
