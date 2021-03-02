interface ControlButtonProps<T extends string> {
  label: T
  onChange: ((s: T) => void) | (() => void)
  name: string
  selection: string
}

const ControlButton = <T extends string>({
  label,
  onChange,
  name,
  selection,
}: ControlButtonProps<T>) => {
  return (
    <div>
      <input
        name={name}
        type="radio"
        id={label}
        onChange={() => onChange(label)}
        checked={selection === label}
      />
      <label htmlFor={label}>{label} </label>
    </div>
  )
}

export { ControlButton }
