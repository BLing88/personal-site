import { median as d3Median, scaleLinear } from "d3"
import { Scatterplot } from "./components/Scatterplot"
import { colors } from "./colors"

const MedianEnqueuePlot = ({
  datasets,
  height,
  width,
  x,
  y,
}: {
  datasets: { index: number; enqueueTime: number; dequeueTime: number }[][]
  height: number
  width: number
  x: number
  y: number
}) => {
  const logMedianTimes = datasets.map(ds => ({
    logMedianEnqueueTime: d3Median(ds, d => Math.log10(d.enqueueTime)),
  }))

  return (
    <svg width={width} height={height}>
      <Scatterplot
        x={x}
        y={y}
        datasets={[
          logMedianTimes
            .slice(0, 6)
            .map((d, i) => [i + 2, d.logMedianEnqueueTime]),
          logMedianTimes
            .slice(6, 12)
            .map((d, i) => [i + 2, d.logMedianEnqueueTime]),
          logMedianTimes
            .slice(12, 19)
            .map((d, i) => [i + 2, d.logMedianEnqueueTime]),
        ]}
        xScale={scaleLinear()
          .domain([2, 7])
          .nice()
          .range([0, width - 140])}
        yScale={scaleLinear()
          .domain([1, 4])
          .range([height - 40, 40])}
        xLabel={"log n"}
        yLabel={"log t"}
        colors={colors}
      />
    </svg>
  )
}

export default MedianEnqueuePlot
export { MedianEnqueuePlot }
