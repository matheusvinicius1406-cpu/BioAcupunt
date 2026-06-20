import { useRef, useState } from "react";

export function SignaturePad({ onSave }: { onSave: (data: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const clear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const save = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      onSave(canvas.toDataURL());
    }
  };

  return (
    <div className="border p-2">
      <canvas ref={canvasRef} width={300} height={150} className="border bg-white" />
      <div className="mt-2 flex gap-2">
        <button onClick={clear} className="p-1 border text-sm">Limpar</button>
        <button onClick={save} className="p-1 bg-green-500 text-white text-sm">Salvar</button>
      </div>
    </div>
  );
}
