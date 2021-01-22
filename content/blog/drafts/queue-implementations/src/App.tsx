import logo from "./logo.svg"
import "./App.css"
import { useEffect, useReducer } from "react"
import {
  min,
  max,
  scaleLinear,
  median as d3Median,
  quantile,
  scaleLog,
} from "d3"
import { Scatterplot } from "./components/Scatterplot"
import { loadDatasets } from "./data-handling"
import { Controls } from "./components/Controls"
import { ControlSet } from "./components/ControlSet"
import { Histogram } from "./components/Histogram"
import { colors } from "./colors"
import { Legend } from "./components/Legend"
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
      median - 3 * (Q3 - Q1) < accessor(d) &&
      accessor(d) < median + 3 * (Q3 - Q1)
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
type Plot = "Scatterplot" | "Histogram"
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
  > | null
  filter: boolean
  dataToShow: null | [number, number][][]
  whichDataToShow: {
    array: boolean
    linkedList: boolean
    object: boolean
  }
}

const SHOW_OUTLIERS = "SHOW_OUTLIERS"
const SIZE = "SIZE"
const SET_DATASETS = "SET_DATASETS"
const CHANGE_PLOT = "CHANGE_PLOT"
const TOGGLE_DATA_TO_SHOW = "TOGGLE_DATA_TO_SHOW"
const TOGGLE_IMPLEMENTATION_TYPE = "TOGGLE_IMPLEMENTATION_TYPE"
type Action =
  | {
      type: "SET_DATASETS"
      datasets: Record<
        Label,
        {
          array: Dataset
          linkedList: Dataset
          object: Dataset
        }
      >
    }
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
  const getDatasets = (
    shouldFilter: boolean,
    size: Label,
    type: DatasetType,
    whichDataToShow: {
      array: boolean
      linkedList: boolean
      object: boolean
    }
  ) => {
    if (!prevState.datasets) {
      return []
    }
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
    case SET_DATASETS:
      return {
        ...prevState,
        datasets: action.datasets,
        dataToShow: [
          action.datasets[prevState.size].array.filtered.dequeueTimes,
          action.datasets[prevState.size].linkedList.filtered.dequeueTimes,
          action.datasets[prevState.size].object.filtered.dequeueTimes,
        ],
      }
    case SHOW_OUTLIERS:
      if (!prevState.datasets) {
        return prevState
      }
      return {
        ...prevState,
        filter: !prevState.filter,
        dataToShow: getDatasets(
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
          dataToShow: getDatasets(
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
          dataToShow: getDatasets(
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
        dataToShow: getDatasets(
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

function App() {
  const [state, dispatch] = useReducer(dispatchFunction, {
    type: "dequeueTimes",
    size: "1000",
    plot: "Scatterplot",
    filter: true,
    datasets: null,
    dataToShow: null,
    whichDataToShow: {
      array: true,
      linkedList: true,
      object: true,
    },
  } as AppState)

  async function loadData() {
    const datasets = await loadDatasets<Data>(d => {
      console.log(d)
      return {
        index: +d.index!,
        enqueueTime: +d.enqueueTime!,
        dequeueTime: +d.dequeueTime!,
      }
    })

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

    dispatch({ type: SET_DATASETS, datasets: structuredDatasets })
  }

  useEffect(() => {
    loadData()
  }, [])

  if (!state.dataToShow) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    )
  } else {
    const plotWidth = 600
    const plotHeight = 500
    console.log(state.dataToShow)
    const medianData = Object.entries(state.datasets!)
      .map(([_, { array, linkedList, object }]) => {
        return [
          array.filtered.enqueueTimes,
          linkedList.filtered.enqueueTimes,
          object.filtered.enqueueTimes,
        ].map(ds => d3Median(ds, d => d[1]))
      })
      .reduce(
        // @ts-ignore
        (datasets, [array, linkedList, object], index) => {
          return [
            [...datasets[0], [index + 2, array]],
            [...datasets[1], [index + 2, linkedList]],
            [...datasets[2], [index + 2, object]],
          ]
        },
        [[], [], []] as [
          [number, number][],
          [number, number][],
          [number, number][]
        ]
      )

    return (
      <svg width={plotWidth} height={plotHeight}>
        <Scatterplot
          x={0}
          y={0}
          // @ts-ignore
          datasets={medianData}
          yScale={scaleLog()
            .domain([0.01, 14000])
            .nice()
            .range([plotHeight - svgMargins.bottom, svgMargins.top])}
          xScale={scaleLinear()
            .domain([2, 7])
            .nice()
            .range([svgMargins.left, plotWidth - svgMargins.right])}
          xLabel={"log n"}
          yLabel={"log t"}
          colors={["lightgreen", "blue", "red"]}
        />
      </svg>
    )
    /*
    const minX = min(state.dataToShow, (ds) => min(ds, (p) => p[0]))!;
    const maxX = max(state.dataToShow, (ds) => max(ds, (p) => p[0]))!;
    const minY = min(state.dataToShow, (ds) => min(ds, (p) => p[1]))!;
    const maxY = max(state.dataToShow, (ds) => max(ds, (p) => p[1]))!;

    const xScale = scaleLinear()
      .domain([minX, maxX])
      .range([svgMargins.left, plotWidth - svgMargins.right]);
    const yScale = scaleLinear()
      .domain([minY, maxY])
      .nice()
      .range([plotHeight - svgMargins.bottom, svgMargins.top]);

    const legendLabels = [];
    const legendColors = [];
    if (state.whichDataToShow.array) {
      legendLabels.push("array");
      legendColors.push(colors[0]);
    }
    if (state.whichDataToShow.linkedList) {
      legendLabels.push("linked list");
      legendColors.push(colors[1]);
    }
    if (state.whichDataToShow.object) {
      legendLabels.push("object");
      legendColors.push(colors[2]);
    }
    return (
      <div>
        <svg width={plotWidth} height={plotHeight}>
          <text
            x={(plotWidth - svgMargins.left - svgMargins.right) / 2 - 50}
            y={svgMargins.top - 10}
            style={{ textTransform: "capitalize" }}
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
              datasets={state.dataToShow.map((dataset) =>
                dataset.map((d) => d[1])
              )}
              accessor={(d) => d}
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
        </svg>
        <Controls>
          <input
            type="checkbox"
            id="array"
            name="array"
            value="array"
            onChange={() => {
              dispatch({ type: TOGGLE_DATA_TO_SHOW, whichData: "array" });
            }}
            checked={state.whichDataToShow.array}
          />
          <label htmlFor="array">array</label>
          <input
            type="checkbox"
            id="linked list"
            name="linked list"
            value="linked list"
            onChange={() => {
              dispatch({ type: TOGGLE_DATA_TO_SHOW, whichData: "linkedList" });
            }}
            checked={state.whichDataToShow.linkedList}
          />
          <label htmlFor="linked list">linked list</label>
          <input
            type="checkbox"
            id="object"
            name="object"
            value="object"
            onChange={() => {
              dispatch({ type: TOGGLE_DATA_TO_SHOW, whichData: "object" });
            }}
            checked={state.whichDataToShow.object}
          />
          <label htmlFor="object">object</label>
          <input
            type="checkbox"
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
          <label htmlFor="enqueueTimes">enqueue</label>
          <input
            type="checkbox"
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
          <label htmlFor="dequeueTimes">dequeue</label>

          <ControlSet
            labels={labels}
            onClick={(label: Label) => dispatch({ type: SIZE, size: label })}
          />
          <ControlSet
            labels={["Show outliers"]}
            onClick={() => dispatch({ type: SHOW_OUTLIERS })}
          />
          <ControlSet
            labels={["Scatterplot", "Histogram"]}
            onClick={(plot: "Scatterplot" | "Histogram") =>
              dispatch({ type: CHANGE_PLOT, plot })
            }
          />
        </Controls>
      </div>
    ); */
  }
}

export default App
