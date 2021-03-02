import "./App.css"
import { useReducer } from "react"
import { min, max, scaleLinear, median as d3Median, quantile } from "d3"
import { Scatterplot } from "./components/Scatterplot"
import { Controls } from "./components/Controls"
import { ControlSet } from "./components/ControlSet"
import { Histogram } from "./components/Histogram"
import { Boxplot } from "./components/Boxplot"
import { colors } from "./colors"
import { Legend } from "./components/Legend"
import { Checkbox } from "./components/Checkbox"
interface Data {
  index: number
  enqueueTime: number
  dequeueTime: number
}

type Label = "100" | "1000" | "10000" | "100000" | "1000000" | "10000000"
const labels: Label[] = [
  "100",
  "1000",
  "10000",
  "100000",
  "1000000",
  "10000000",
]

interface Datasets {
  enqueueTimes: [number, number][]
  dequeueTimes: [number, number][]
}

function formatData(times: Datasets, d: Data, index: number) {
  times.enqueueTimes.push([index, d.enqueueTime / 1000])
  times.dequeueTimes.push([index, d.dequeueTime / 1000])
  return times
}

function outlierFilter(
  dataset: [number, number][],
  accessor: (ds: [number, number]) => number
) {
  const median = d3Median(dataset, accessor)
  const Q1 = quantile(dataset, 0.25, accessor)
  const Q3 = quantile(dataset, 0.75, accessor)
  if (median && Q1 && Q3) {
    return (d: [number, number]) =>
      Q1 - 1.5 * (Q3 - Q1) < accessor(d) && accessor(d) < Q3 + 1.5 * (Q3 - Q1)
  } else {
    return () => true
  }
}

const svgMargins = {
  top: 40,
  left: 65,
  right: 140,
  bottom: 40,
}
type DatasetType = "dequeueTimes" | "enqueueTimes"
type Plot = "Scatterplot" | "Histogram" | "Boxplot"
interface Dataset {
  raw: Record<"enqueueTimes" | "dequeueTimes", [number, number][]>
  filtered: Record<"enqueueTimes" | "dequeueTimes", [number, number][]>
}

interface AppState {
  type: DatasetType
  size: Label
  plot: Plot
  datasets: Record<
    Label,
    {
      array: Dataset
      linkedList: Dataset
      object: Dataset
    }
  >
  filter: boolean
  dataToShow: [number, number][][]
  whichDataToShow: {
    array: boolean
    linkedList: boolean
    object: boolean
  }
}
function structureDatasets(
  datasets: { index: number; enqueueTime: number; dequeueTime: number }[][]
) {
  const structuredDatasets = {} as Record<
    Label,
    {
      array: Dataset
      linkedList: Dataset
      object: Dataset
    }
  >
  for (let i = 0; i < labels.length; i++) {
    const arrayTimes = datasets[i].reduce(formatData, {
      enqueueTimes: [],
      dequeueTimes: [],
    })
    const filteredArrayTimes = {} as Datasets
    filteredArrayTimes.enqueueTimes = arrayTimes.enqueueTimes.filter(
      outlierFilter(arrayTimes.enqueueTimes, d => d[1])
    )
    filteredArrayTimes.dequeueTimes = arrayTimes.dequeueTimes.filter(
      outlierFilter(arrayTimes.dequeueTimes, d => d[1])
    )

    const linkedListTimes = datasets[i + labels.length].reduce(formatData, {
      enqueueTimes: [],
      dequeueTimes: [],
    })
    const filteredLinkedListTimes = {} as Datasets
    filteredLinkedListTimes.enqueueTimes = linkedListTimes.enqueueTimes.filter(
      outlierFilter(linkedListTimes.enqueueTimes, d => d[1])
    )
    filteredLinkedListTimes.dequeueTimes = linkedListTimes.dequeueTimes.filter(
      outlierFilter(linkedListTimes.dequeueTimes, d => d[1])
    )

    const objectTimes = datasets[i + 2 * labels.length].reduce(formatData, {
      enqueueTimes: [],
      dequeueTimes: [],
    })
    const filteredObjectTimes = {} as Datasets
    filteredObjectTimes.enqueueTimes = objectTimes.enqueueTimes.filter(
      outlierFilter(objectTimes.enqueueTimes, d => d[1])
    )
    filteredObjectTimes.dequeueTimes = objectTimes.dequeueTimes.filter(
      outlierFilter(objectTimes.dequeueTimes, d => d[1])
    )

    structuredDatasets[labels[i]] = {
      array: {
        raw: arrayTimes,
        filtered: filteredArrayTimes,
      },
      linkedList: {
        raw: linkedListTimes,
        filtered: filteredLinkedListTimes,
      },
      object: {
        raw: objectTimes,
        filtered: filteredObjectTimes,
      },
    }
  }
  return structuredDatasets
}

const SHOW_OUTLIERS = "SHOW_OUTLIERS"
const SIZE = "SIZE"
const CHANGE_PLOT = "CHANGE_PLOT"
const TOGGLE_DATA_TO_SHOW = "TOGGLE_DATA_TO_SHOW"
const TOGGLE_IMPLEMENTATION_TYPE = "TOGGLE_IMPLEMENTATION_TYPE"
type Action =
  | { type: "SHOW_OUTLIERS" }
  | { type: "SIZE"; size: Label }
  | { type: "CHANGE_PLOT"; plot: Plot }
  | {
      type: "TOGGLE_DATA_TO_SHOW"
      whichData: "array" | "linkedList" | "object"
    }
  | {
      type: "TOGGLE_IMPLEMENTATION_TYPE"
      implementationType: DatasetType
    }
const dispatchFunction = (prevState: AppState, action: Action) => {
  const getDataToShow = (
    shouldFilter: boolean,
    size: Label,
    type: DatasetType,
    whichDataToShow: {
      array: boolean
      linkedList: boolean
      object: boolean
    }
  ) => {
    const dataToShow = []
    if (shouldFilter) {
      if (whichDataToShow.array) {
        dataToShow.push(prevState.datasets[size].array.filtered[type])
      }
      if (whichDataToShow.linkedList) {
        dataToShow.push(prevState.datasets[size].linkedList.filtered[type])
      }
      if (whichDataToShow.object) {
        dataToShow.push(prevState.datasets[size].object.filtered[type])
      }
    } else {
      if (whichDataToShow.array) {
        dataToShow.push(prevState.datasets[size].array.raw[type])
      }
      if (whichDataToShow.linkedList) {
        dataToShow.push(prevState.datasets[size].linkedList.raw[type])
      }
      if (whichDataToShow.object) {
        dataToShow.push(prevState.datasets[size].object.raw[type])
      }
    }
    return dataToShow
  }
  switch (action.type) {
    case SHOW_OUTLIERS:
      return {
        ...prevState,
        filter: !prevState.filter,
        dataToShow: getDataToShow(
          !prevState.filter,
          prevState.size,
          prevState.type,
          prevState.whichDataToShow
        ),
      }
    case SIZE:
      if (prevState.datasets) {
        return {
          ...prevState,
          size: action.size,
          dataToShow: getDataToShow(
            prevState.filter,
            action.size,
            prevState.type,
            prevState.whichDataToShow
          ),
        }
      } else {
        return prevState
      }

    case CHANGE_PLOT:
      return {
        ...prevState,
        plot: action.plot,
      }
    case TOGGLE_DATA_TO_SHOW:
      if (
        (action.whichData === "object" &&
          !prevState.whichDataToShow.array &&
          !prevState.whichDataToShow.linkedList &&
          prevState.whichDataToShow.object) ||
        (action.whichData === "array" &&
          prevState.whichDataToShow.array &&
          !prevState.whichDataToShow.linkedList &&
          !prevState.whichDataToShow.object) ||
        (action.whichData === "linkedList" &&
          !prevState.whichDataToShow.array &&
          prevState.whichDataToShow.linkedList &&
          !prevState.whichDataToShow.object)
      ) {
        return prevState
      } else {
        const updatedWhichDataToShow = {
          ...prevState.whichDataToShow,
          [action.whichData]: !prevState.whichDataToShow[action.whichData],
        }
        return {
          ...prevState,
          whichDataToShow: updatedWhichDataToShow,
          dataToShow: getDataToShow(
            prevState.filter,
            prevState.size,
            prevState.type,
            updatedWhichDataToShow
          ),
        }
      }
    case TOGGLE_IMPLEMENTATION_TYPE:
      return {
        ...prevState,
        type: action.implementationType,
        dataToShow: getDataToShow(
          prevState.filter,
          prevState.size,
          action.implementationType,
          prevState.whichDataToShow
        ),
      }
    default:
      return prevState
  }
}

function initializeState(
  datasets: { index: number; enqueueTime: number; dequeueTime: number }[][]
): AppState {
  const data = structureDatasets(datasets)
  return {
    type: "dequeueTimes",
    size: "1000",
    plot: "Scatterplot",
    filter: true,
    datasets: data,
    dataToShow: [
      data[1000].array.filtered.dequeueTimes,
      data[1000].linkedList.filtered.dequeueTimes,
      data[1000].object.filtered.dequeueTimes,
    ],
    whichDataToShow: {
      array: true,
      linkedList: true,
      object: true,
    },
  }
}

function App({
  datasets,
}: {
  datasets: { index: number; enqueueTime: number; dequeueTime: number }[][]
}) {
  const [state, dispatch] = useReducer(
    dispatchFunction,
    datasets,
    initializeState
  )

  const plotWidth = 670
  const plotHeight = 500

  const minX = min(
    state.dataToShow!,
    (ds: [number, number][]) => min(ds, (p: [number, number]) => p[0])!
  )!
  const maxX = max(
    state.dataToShow!,
    (ds: [number, number][]) => max(ds, (p: [number, number]) => p[0])!
  )!
  const minY = min(
    state.dataToShow,
    (ds: [number, number][]) => min(ds, (p: [number, number]) => p[1])!
  )!
  const maxY = max(
    state.dataToShow,
    (ds: [number, number][]) => max(ds, (p: [number, number]) => p[1])!
  )!

  const xScale = scaleLinear()
    .domain([minX, maxX])
    .range([svgMargins.left, plotWidth - svgMargins.right])
  const yScale = scaleLinear()
    .domain([minY, maxY])
    .nice()
    .range([plotHeight - svgMargins.bottom, svgMargins.top])

  const legendLabels = []
  const legendColors = []
  if (state.whichDataToShow.array) {
    legendLabels.push("array")
    legendColors.push(colors[0])
  }
  if (state.whichDataToShow.linkedList) {
    legendLabels.push("linked list")
    legendColors.push(colors[1])
  }
  if (state.whichDataToShow.object) {
    legendLabels.push("object")
    legendColors.push(colors[2])
  }
  return (
    <div>
      <svg viewBox={`0 0 ${plotWidth} ${plotHeight}`}>
        <text
          x={(plotWidth - svgMargins.left - svgMargins.right) / 2 - 50}
          y={svgMargins.top - 10}
          style={{ textTransform: "capitalize", fill: "currentcolor" }}
        >{`${state.type.slice(0, state.type.length - 5)} times with ${
          state.size
        } elements`}</text>
        <Legend
          colors={legendColors}
          labels={legendLabels}
          x={plotWidth - svgMargins.right + 25}
          y={plotHeight / 2}
        />
        {state.plot === "Histogram" ? (
          <Histogram
            x={0}
            y={svgMargins.top}
            axisLabel={`time (\u03bcs)`}
            xScale={scaleLinear()
              .domain([minY, maxY])
              .nice()
              .range([svgMargins.left, plotWidth - svgMargins.right])}
            height={plotHeight - svgMargins.top - svgMargins.bottom}
            datasets={state.dataToShow.map(dataset => dataset.map(d => d[1]))}
            accessor={d => d}
            colors={legendColors}
          />
        ) : null}
        {state.plot === "Scatterplot" ? (
          <Scatterplot
            datasets={state.dataToShow}
            xScale={xScale}
            yScale={yScale}
            x={0}
            y={0}
            xLabel={"iteration"}
            yLabel={"time (\u03bcs)"}
            colors={legendColors}
          />
        ) : null}
        {state.plot === "Boxplot" ? (
          <Boxplot
            datasets={state.dataToShow}
            yScale={yScale}
            x={svgMargins.left}
            width={plotWidth - svgMargins.left - svgMargins.right}
            colors={legendColors}
            labels={legendLabels}
          />
        ) : null}
      </svg>
      <Controls>
        <fieldset>
          <legend>Implementation</legend>
          <Checkbox
            label={"array"}
            onChange={() => {
              dispatch({ type: TOGGLE_DATA_TO_SHOW, whichData: "array" })
            }}
            checked={state.whichDataToShow.array}
          />
          <Checkbox
            label="linked list"
            onChange={() => {
              dispatch({ type: TOGGLE_DATA_TO_SHOW, whichData: "linkedList" })
            }}
            checked={state.whichDataToShow.linkedList}
          />
          <Checkbox
            label="object"
            onChange={() => {
              dispatch({ type: TOGGLE_DATA_TO_SHOW, whichData: "object" })
            }}
            checked={state.whichDataToShow.object}
          />
        </fieldset>
        <fieldset>
          <legend>Which times</legend>
          <label htmlFor="enqueueTimes">
            <input
              type="radio"
              id="enqueueTimes"
              name="enqueueTimes"
              value="enqueueTimes"
              onChange={() =>
                dispatch({
                  type: TOGGLE_IMPLEMENTATION_TYPE,
                  implementationType: "enqueueTimes",
                })
              }
              checked={state.type === "enqueueTimes"}
            />
            <span className="label">enqueue</span>
          </label>
          <label htmlFor="dequeueTimes">
            <input
              type="radio"
              id="dequeueTimes"
              name="dequeueTimes"
              value="dequeueTimes"
              onChange={() =>
                dispatch({
                  type: TOGGLE_IMPLEMENTATION_TYPE,
                  implementationType: "dequeueTimes",
                })
              }
              checked={state.type === "dequeueTimes"}
            />
            <span className="label">dequeue</span>
          </label>
        </fieldset>

        <ControlSet
          labels={labels}
          onChange={(label: Label) => dispatch({ type: SIZE, size: label })}
          name={SIZE}
          selection={state.size}
          legendCaption={"Queue size"}
        />

        <ControlSet
          labels={["Scatterplot", "Histogram", "Boxplot"]}
          onChange={(plot: Plot) => dispatch({ type: CHANGE_PLOT, plot })}
          name={CHANGE_PLOT}
          selection={state.plot}
          legendCaption={"Plot"}
        />
        <span style={{ marginTop: "0.1em" }}>
          <Checkbox
            label="show outliers"
            onChange={() => dispatch({ type: SHOW_OUTLIERS })}
            checked={!state.filter}
          />
        </span>
      </Controls>
    </div>
  )
}

export default App
