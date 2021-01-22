interface ControlButtonProps<T extends string> {
  label: T;
  onClick: ((s: T) => void) | (() => void);
}

const ControlButton = <T extends string>({
  label,
  onClick
}: ControlButtonProps<T>) => {
  return <button onClick={() => onClick(label)}>{label}</button>
}

export { ControlButton }
