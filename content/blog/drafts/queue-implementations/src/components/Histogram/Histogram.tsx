import { ScaleLinear, bin, scaleLinear, max } from "d3"
import { Axis } from "../Axis"
interface HistogramProps {
  accessor: (d: number, i?: number, data?: ArrayLike<number>) => number
  x: number
  y: number
  height: number
  xScale: ScaleLinear<number, number, never>
  datasets: number[][]
  axisLabel: string
  colors: string[]
}

interface HistogramBarProps {
  x: number
  y: number
  width: number
  height: number
  color: string
  label: string
}

const HistogramBar = ({
  x,
  y,
  width,
  height,
  color,
  label,
}: HistogramBarProps) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <rect width={width} height={height} fill={color} stroke="grey" />
      {label !== "" ? (
        <text textAnchor="end" x={width - 5} y={height / 2 + 3}>
          {label}
        </text>
      ) : null}
    </g>
  )
}

const Histogram = ({
  x,
  y,
  xScale,
  height,
  datasets,
  accessor,
  axisLabel,
  colors,
}: HistogramProps) => {
  const histogram = bin()
    .value(accessor)
    .domain(xScale.domain() as [number, number])
  const barsets = datasets.map(histogram)
  const maxCount = max(barsets.map(barset => max(barset, bin => bin.length)!))
  const countScale = scaleLinear()
    .domain([0, maxCount!])
    .nice()
    .range([0, height])

  return (
    <g transform={`translate(${x},${y})`}>
      <Axis
        x={xScale.range()[0]}
        y={0}
        scale={scaleLinear().domain([0, maxCount!]).nice().range([height, 0])}
        axisType={"Left"}
        label={"counts"}
      />
      <Axis
        x={0}
        y={countScale.range()[1]}
        scale={xScale}
        axisType={"Bottom"}
        label={axisLabel}
      />
      {barsets.map((barset, j) => {
        return barset.map(bar => (
          <HistogramBar
            x={xScale(bar.x0!)}
            y={height - countScale(bar.length)}
            key={`${colors[j]}-${bar.x0}`}
            width={xScale(bar.x1!) - xScale(bar.x0!)}
            height={countScale(bar.length)}
            color={colors[j]}
            label={""}
          />
        ))
      })}
      );
    </g>
  )
}

export { Histogram }
