interface DatapointProps {
  x: number;
  y: number;
  r: number;
  color: string;
}

const Datapoint = ({ x, y, r, color }: DatapointProps) => {
  return <circle r={r} cx={x} cy={y} fill={color} />
}

export { Datapoint }
