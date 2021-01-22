import { ReactChild } from 'react'

interface ControlProps {
  children: ReactChild | ReactChild[];
}
const Controls = ({ children }: ControlProps) => {
  return <div className="controls">{children}</div>
}

export { Controls }
