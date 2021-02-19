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

const SameQueueDequeueTimesPlot = ({
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
    .domain([145, 230])
    .nice()
    .range([height - 40, 40])
  return (
    <svg viewBox={`0 0 ${width} ${2 * height}`}>
      <Scatterplot
        x={x}
        y={y}
        datasets={datasets}
        xScale={xScale}
        yScale={yScale}
        xLabel={"n-th thousandth item dequeued"}
        yLabel={"t (ns)"}
        colors={colors}
      />
      <Legend
        colors={colors.slice(1)}
        labels={["linked list", "object"]}
        x={width - 140 + 25}
        y={height / 2}
      />
      <Scatterplot
        x={x}
        y={y}
        datasets={[datasets[0].filter(d => d[1] < 700000)]}
        xScale={xScale}
        yScale={scaleLinear()
          .domain([0, 700000])
          .nice()
          .range([2 * height - 40, height + 40])}
        xLabel={"n-th thousandth item dequeued"}
        yLabel={"t (ns)"}
        colors={colors}
      />
      <Legend
        colors={[colors[0]]}
        labels={["array"]}
        x={width - 140 + 25}
        y={(3 * height) / 2}
      />
    </svg>
  )
}

export default SameQueueDequeueTimesPlot
export { SameQueueDequeueTimesPlot }
