import { ControlButton } from "../ControlButton"

interface ControlSetProps<T extends string> {
  labels: T[]
  onChange: ((s: T) => void) | (() => void)
  name: string
  selection: string
  legendCaption: string
}
const ControlSet = <U extends string>({
  labels,
  onChange,
  name,
  selection,
  legendCaption,
}: ControlSetProps<U>) => {
  return (
    <fieldset>
      <legend>{legendCaption}</legend>
      {labels.map(label => (
        <ControlButton
          name={name}
          onChange={onChange}
          label={label}
          key={label}
          selection={selection}
        />
      ))}
    </fieldset>
  )
}

export { ControlSet }
