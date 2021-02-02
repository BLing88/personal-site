import { scaleBand, ScaleLinear, median as d3Median, quantile } from "d3"
import { Fragment } from "react"
import { Axis } from "../Axis"
interface BoxplotProps {
  datasets: [number, number][][]
  labels: string[]
  yScale: ScaleLinear<number, number, never>
  x: number
  width: number
  colors: string[]
}
const boxplotWidth = 40
const Boxplot = ({
  datasets,
  labels,
  colors,
  x,
  width,
  yScale,
}: BoxplotProps) => {
  const xScale = scaleBand().domain(labels).range([0, width])
  const dataStatistics = datasets.map(ds => {
    const firstQuartile = quantile(ds, 0.25, d => d[1])!
    const thirdQuartile = quantile(ds, 0.75, d => d[1])!
    const IQR = thirdQuartile - firstQuartile
    const upperFence = thirdQuartile + 1.5 * IQR
    const lowerFence = firstQuartile - 1.5 * IQR
    const [lowerWhisker, upperWhisker, outliers] = ds.reduce(
      ([lowerWhisker, upperWhisker, outliers], [i, d]) => {
        if (d > upperFence || d < lowerFence) {
          outliers.push([i, d])
        } else if (d > thirdQuartile) {
          upperWhisker = Math.max(d, upperWhisker)
        } else if (d < firstQuartile) {
          lowerWhisker = Math.min(d, lowerWhisker)
        }
        return [lowerWhisker, upperWhisker, outliers]
      },
      [Infinity, -Infinity, [] as [number, number][]]
    )
    return {
      median: d3Median(ds, d => d[1])!,
      firstQuartile,
      thirdQuartile,
      lowerWhisker,
      upperWhisker,
      outliers,
    }
  })
  const bandwidth = xScale.bandwidth()
  return (
    <g transform={`translate(${x},${0})`}>
      <Axis
        x={0}
        y={yScale.range()[0]}
        // @ts-ignore
        scale={xScale}
        axisType={"Bottom"}
        label={""}
      />
      <Axis
        x={0}
        y={0}
        scale={yScale}
        axisType={"Left"}
        label={"time (\u03bcs)"}
      />
      {dataStatistics.map((ds, i) => {
        const centerXPos = xScale(labels[i])! + bandwidth / 2
        return (
          <Fragment
            key={`${ds.median}${ds.firstQuartile}${ds.thirdQuartile}${ds.outliers}`}
          >
            <rect
              fill={colors[i]}
              stroke={"currentcolor"}
              x={centerXPos - boxplotWidth / 2}
              y={yScale(ds.thirdQuartile)}
              width={boxplotWidth}
              height={yScale(ds.firstQuartile) - yScale(ds.thirdQuartile)}
            />
            <line
              stroke={"black"}
              x1={centerXPos - boxplotWidth / 2}
              x2={centerXPos + boxplotWidth / 2}
              y1={yScale(ds.median)}
              y2={yScale(ds.median)}
            />

            <line
              stroke={"currentcolor"}
              x1={centerXPos}
              x2={centerXPos}
              y1={yScale(ds.thirdQuartile)}
              y2={yScale(ds.upperWhisker)}
            />
            <line
              stroke={"currentcolor"}
              x1={centerXPos - 7}
              x2={centerXPos + 7}
              y1={yScale(ds.upperWhisker)}
              y2={yScale(ds.upperWhisker)}
            />
            <line
              stroke={"currentcolor"}
              x1={centerXPos}
              x2={centerXPos}
              y1={yScale(ds.firstQuartile)}
              y2={yScale(ds.lowerWhisker)}
            />
            <line
              stroke={"currentcolor"}
              x1={centerXPos - 7}
              x2={centerXPos + 7}
              y1={yScale(ds.lowerWhisker)}
              y2={yScale(ds.lowerWhisker)}
            />
            {ds.outliers.map(([index, d]) => (
              <circle
                cx={centerXPos}
                cy={yScale(d)}
                r={3}
                fill={colors[i]}
                key={`${centerXPos}${index}${d}`}
              />
            ))}
          </Fragment>
        )
      })}
    </g>
  )
}

export { Boxplot }
