import { ControlButton } from '../ControlButton'

interface ControlSetProps<T extends string> {
  labels: T[];
  onClick: ((s: T) => void) | (() => void);
}
const ControlSet = <U extends string>({
  labels,
  onClick
}: ControlSetProps<U>) => {
  return (
    <div>
      {labels.map((label) => (
        <ControlButton onClick={onClick} label={label} key={label} />
      ))}
    </div>
  )
}

export { ControlSet }
