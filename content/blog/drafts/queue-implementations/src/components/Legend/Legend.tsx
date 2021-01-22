interface LegendEntryProps {
  label: string;
  color: string;
  x: number;
  y: number;
}

const LegendEntry = ({ label, color, x, y }: LegendEntryProps) => {
  return (
    <g>
      <rect x={x} y={y} fill={color} width={10} height={10} />
      <text
        x={x + 20}
        y={y}
        dy={'0.5em'}
        alignmentBaseline={'middle'}
        textAnchor={'start'}
      >
        {label}{' '}
      </text>
    </g>
  )
}

interface LegendProps {
  colors: string[];
  labels: string[];
  x: number;
  y: number;
}

const Legend = ({ labels, colors, x, y }: LegendProps) => {
  return (
    <g className={'legend'} transform={`translate(${x},${y})`}>
      {labels.map((label, index) => (
        <LegendEntry
          key={label}
          label={label}
          color={colors[index]}
          x={0}
          y={index * 25}
        />
      ))}
    </g>
  )
}

export { Legend }
