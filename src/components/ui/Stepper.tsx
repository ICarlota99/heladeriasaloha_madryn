interface StepperProps {
  value: number;
  onDecrement: () => void;
  onIncrement: () => void;
  decrementDisabled?: boolean;
  incrementDisabled?: boolean;
  label?: string;
}

export default function Stepper({
  value,
  onDecrement,
  onIncrement,
  decrementDisabled = false,
  incrementDisabled = false,
  label = 'Cantidad',
}: StepperProps) {
  return (
    <div className="flex items-center gap-3" aria-label={label}>
      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand text-lg font-bold text-brand transition hover:bg-brand hover:text-white disabled:opacity-40"
        onClick={onDecrement}
        disabled={decrementDisabled}
        aria-label="Restar"
      >
        −
      </button>
      <span className="min-w-8 text-center text-2xl font-bold tabular-nums">{value}</span>
      <button
        type="button"
        className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-brand text-lg font-bold text-brand transition hover:bg-brand hover:text-white disabled:opacity-40"
        onClick={onIncrement}
        disabled={incrementDisabled}
        aria-label="Sumar"
      >
        +
      </button>
    </div>
  );
}
