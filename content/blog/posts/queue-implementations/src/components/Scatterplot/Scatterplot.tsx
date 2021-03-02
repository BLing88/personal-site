import { ScaleLinear } from 'd3'
import { Datapoint } from '../Datapoint'
import { Axis } from '../Axis'
interface ScatterplotProps {
  datasets: [number, number][][];
  xScale: ScaleLinear<number, number, never>;
  yScale: ScaleLinear<number, number, never>;
  x: number;
  y: number;
  xLabel: string;
  yLabel: string;
  colors: string[];
}

const Scatterplot = ({
  datasets,
  xScale,
  yScale,
  x,
  y,
  xLabel,
  yLabel,
  colors
}: ScatterplotProps) => {
  return (
    <g className="scatterplot" transform={`translate(${x},${y})`}>
      <Axis
        x={0}
        y={yScale.range()[0]}
        scale={xScale}
        axisType={'Bottom'}
        label={xLabel}
      />
      <Axis
        x={xScale.range()[0]}
        y={0}
        scale={yScale}
        axisType={'Left'}
        label={yLabel}
      />
      {datasets.map((dataset, index) =>
        dataset.map((d) => (
          <Datapoint
            r={3}
            x={xScale(d[0])}
            y={yScale(d[1])}
            color={colors[index]}
            key={`${d[0]},${d[1]}`}
          />
        ))
      )}
    </g>
  )
}

export { Scatterplot }
