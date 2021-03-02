import { css } from "@emotion/react"
interface CheckboxProps {
  label: string
  onChange: () => void
  checked: boolean
}
const checkboxStyles = css`
  display: grid;
  grid-template-columns: min-content auto;
  grid-gap: 0.5em;

  input[type="checkbox"] {
    opacity: 0;
    width: 1em;
    height: 1em;
  }

  input[type="checkbox"]:hover {
    cursor: pointer;
  }

  input:checked + label {
    border: 1px solid hsl(1, 100%, 79%);
    border-radius: 3px;
    color: hsl(1, 100%, 79%);
  }

  .checkbox-input {
    display: grid;
    grid-template-areas: "checkbox";
    > * {
      grid-area: checkbox;
    }
  }

  .svg-checkbox-span {
    display: inline-grid;
    width: 1em;
    height: 1em;
    border-radius: 0.25em;
    border: 0.1em solid;
  }

  .svg-checkbox-span:hover {
    cursor: pointer;
  }

  .svg-checkbox-span svg {
    transition: transform 0.1s ease-in 25ms;
    transform: scale(0);
    transform-origin: bottom-left;
  }

  input:checked + .svg-checkbox-span svg {
    transform: scale(1);
  }

  .label-span {
    line-height: 1;
  }
`

const Checkbox = ({ label, onChange, checked }: CheckboxProps) => {
  return (
    <label css={checkboxStyles}>
      <span className="checkbox-input">
        <input type="checkbox" onChange={onChange} checked={checked} />
        <span className="svg-checkbox-span">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            aria-hidden="true"
            focusable="false"
          >
            <path
              fill="none"
              stroke="#ff9492"
              strokeWidth="3"
              d="M1.73 12.91l6.37 6.37L22.79 4.59"
            />
          </svg>
        </span>
      </span>
      <span className="label-span"> {label}</span>
    </label>
  )
}

export { Checkbox }
