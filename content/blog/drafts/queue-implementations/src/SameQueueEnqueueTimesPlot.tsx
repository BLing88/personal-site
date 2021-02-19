import { scaleLinear } from "d3"
import { Scatterplot } from "./components/Scatterplot"
import { colors } from "./colors"
import { Legend } from "./components/Legend"
interface PlotProps {
  datasets: [number, number][][]
  x: number
  y: number
  width: number
  height: number
}

const SameQueueEnqueueTimesPlot = ({
  datasets,
  width,
  height,
  x,
  y,
}: PlotProps) => {
  const xScale = scaleLinear()
    .domain([0, 1000])
    .nice()
    .range([0, width - 140 - x])
  const yScale = scaleLinear()
    .domain([145, 320])
    .nice()
    .range([height - 40, 40])
  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <Scatterplot
        x={x}
        y={y}
        datasets={datasets}
        xScale={xScale}
        yScale={yScale}
        xLabel={"n-thousandth item enqueued"}
        yLabel={"t (ns)"}
        colors={colors}
      />
      <Legend
        colors={colors}
        labels={["array", "linked list", "object"]}
        x={width - 140 + 25}
        y={height / 2}
      />
    </svg>
  )
}

export default SameQueueEnqueueTimesPlot
export { SameQueueEnqueueTimesPlot }
