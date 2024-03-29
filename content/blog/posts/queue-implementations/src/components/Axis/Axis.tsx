import { ScaleBand, ScaleLinear } from "d3"
import { useRef, useEffect, MutableRefObject } from "react"
import * as d3 from "d3"
type AxisType = "Top" | "Bottom" | "Left" | "Right"
interface AxisProps {
  x: number
  y: number
  scale: ScaleLinear<number, number, never> | ScaleBand<string>
  axisType: AxisType
  label: string
}

type D3AxisType = `axis${AxisType}`

function labelPos({
  axisType,
  scale,
}: {
  axisType: AxisType
  scale: ScaleLinear<number, number, never> | ScaleBand<string>
}) {
  switch (axisType) {
    case "Top":
      return { x: scale.range()[1], y: 0 }
    case "Right":
      return { x: 20, y: 0 }
    case "Bottom":
      return { x: scale.range()[1], y: 35 }
    case "Left":
    default:
      return { x: -5, y: scale.range()[1] - 15 }
  }
}

const Axis = ({ x, y, scale, axisType, label }: AxisProps) => {
  const gRef = useRef<SVGGElement>(null) as MutableRefObject<SVGGElement>
  // @ts-ignore
  const axis = d3[`axis${axisType}` as D3AxisType](scale)
  axis.ticks(10, "~s")
  useEffect(() => {
    d3.select(gRef.current).call(axis)
  })

  return (
    <g
      ref={gRef}
      transform={`translate(${x}, ${y})`}
      style={{ fontSize: "14px" }}
    >
      <text
        {...labelPos({ axisType, scale })}
        style={{
          fill: "currentcolor",
          fontFamily: "sans-serif",
        }}
      >
        {label}
      </text>
    </g>
  )
}

export { Axis }
