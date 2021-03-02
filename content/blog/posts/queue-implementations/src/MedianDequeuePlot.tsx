import { median as d3Median, scaleLinear, quantile } from "d3"
import { Scatterplot } from "./components/Scatterplot"
import { colors } from "./colors"
import { Fragment } from "react"
import { Legend } from "./components/Legend"

const MedianDequeuePlot = ({
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
    logMedianDequeueTime: d3Median(ds, d => Math.log10(d.dequeueTime))!,
    firstQuartile: quantile(ds, 0.25, d => Math.log10(d.dequeueTime))!,
    thirdQuartile: quantile(ds, 0.75, d => Math.log10(d.dequeueTime))!,
  }))
  const xScale = scaleLinear()
    .domain([2, 7])
    .nice()
    .range([0, width - 140 - x])
  const yScale = scaleLinear()
    .domain([2, 7])
    .range([height - 40, 40])
  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <Scatterplot
        x={x}
        y={y}
        datasets={[
          logMedianTimes
            .slice(0, 6)
            .map((d, i) => [i + 2, d.logMedianDequeueTime]),
          logMedianTimes
            .slice(6, 12)
            .map((d, i) => [i + 2, d.logMedianDequeueTime]),
          logMedianTimes
            .slice(12, 19)
            .map((d, i) => [i + 2, d.logMedianDequeueTime]),
        ]}
        xScale={xScale}
        yScale={yScale}
        xLabel={"log n"}
        yLabel={"log t"}
        colors={colors}
      />
      <Legend
        colors={colors}
        labels={["array", "linked list", "object"]}
        x={width - 140 + 25}
        y={height / 2}
      />
      {logMedianTimes.slice(0, 6).map((ds, i) => {
        return (
          <Fragment key={ds.logMedianDequeueTime}>
            <line
              stroke={colors[0]}
              x1={65 + xScale(i + 2)}
              x2={65 + xScale(i + 2)}
              y1={yScale(ds.logMedianDequeueTime)}
              y2={yScale(ds.thirdQuartile)}
            />
            <line
              stroke={colors[0]}
              x1={65 + xScale(i + 2)}
              x2={65 + xScale(i + 2)}
              y1={yScale(ds.logMedianDequeueTime)}
              y2={yScale(ds.firstQuartile)}
            />
          </Fragment>
        )
      })}
      {logMedianTimes.slice(6, 12).map((ds, i) => {
        return (
          <Fragment key={ds.logMedianDequeueTime}>
            <line
              stroke={colors[1]}
              x1={65 + xScale(i + 2)}
              x2={65 + xScale(i + 2)}
              y1={yScale(ds.logMedianDequeueTime)}
              y2={yScale(ds.thirdQuartile)}
            />
            <line
              stroke={colors[1]}
              x1={65 + xScale(i + 2)}
              x2={65 + xScale(i + 2)}
              y1={yScale(ds.logMedianDequeueTime)}
              y2={yScale(ds.firstQuartile)}
            />
          </Fragment>
        )
      })}
      {logMedianTimes.slice(12, 19).map((ds, i) => {
        return (
          <Fragment key={ds.logMedianDequeueTime}>
            <line
              stroke={colors[2]}
              x1={65 + xScale(i + 2)}
              x2={65 + xScale(i + 2)}
              y1={yScale(ds.logMedianDequeueTime)}
              y2={yScale(ds.thirdQuartile)}
            />
            <line
              stroke={colors[2]}
              x1={65 + xScale(i + 2)}
              x2={65 + xScale(i + 2)}
              y1={yScale(ds.logMedianDequeueTime)}
              y2={yScale(ds.firstQuartile)}
            />
          </Fragment>
        )
      })}
    </svg>
  )
}

export default MedianDequeuePlot
export { MedianDequeuePlot }
