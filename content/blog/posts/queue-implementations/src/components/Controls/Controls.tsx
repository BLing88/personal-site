import { css } from "@emotion/react"
import { ReactChild } from "react"

const styles = css(`
  display: flex;
  justify-content: space-between;

  fieldset {
    display: inline-flex;
    flex-direction: column;
    padding: 0.25rem;
    border: none;
  }

  legend { 
    color: hsl(var(--baseAccentColor))
  }

  label, .label {
    padding: 0.1rem 0.15rem;
  }

 input[type="radio"]:hover, label:hover {
    cursor: pointer;
    color: hsl(1, 100%, 79%)
  }
       
  input[type="radio"] {
    opacity: 0;
    width: 0;
    height: 0;
  }

  input:checked + label, input:checked ~ .label {
    border: 1px solid hsl(1, 100%, 79%);
    border-radius: 3px;
    color: hsl(1, 100%, 79%);
  }

  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    grid-auto-flow: column;
  }

`)

interface ControlProps {
  children: ReactChild | ReactChild[]
}
const Controls = ({ children }: ControlProps) => {
  return (
    <div css={styles} className="controls">
      {children}
    </div>
  )
}

export { Controls }
