import { csv, DSVRowString } from "d3"
import array100 from "./data/array-queue-100.json"
import array1000 from "./data/array-queue-1000.json"
import array10000 from "./data/array-queue-10000.json"
import array100000 from "./data/array-queue-100000.json"
import array1000000 from "./data/array-queue-1000000.json"
import array10000000 from "./data/array-queue-10000000.json"
import linkedList100 from "./data/linked-list-queue-100.json"
import linkedList1000 from "./data/linked-list-queue-1000.json"
import linkedList10000 from "./data/linked-list-queue-10000.json"
import linkedList100000 from "./data/linked-list-queue-100000.json"
import linkedList1000000 from "./data/linked-list-queue-1000000.json"
import linkedList10000000 from "./data/linked-list-queue-10000000.json"
import object100 from "./data/object-queue-100.json"
import object1000 from "./data/object-queue-1000.json"
import object10000 from "./data/object-queue-10000.json"
import object100000 from "./data/object-queue-100000.json"
import object1000000 from "./data/object-queue-1000000.json"
import object10000000 from "./data/object-queue-10000000.json"

async function loadDatasets<T extends object>(
  // path: string,
  callback: (
    rawRow: DSVRowString<string>,
    index: number,
    columns: string[]
  ) => T
) {
  const datasets = await Promise.all([
    csv("data/array-queue-100.csv", callback),
    csv("data/array-queue-1000.csv", callback),
    csv("data/array-queue-10000.csv", callback),
    csv("data/array-queue-100000.csv", callback),
    csv("data/array-queue-1000000.csv", callback),
    csv("data/array-queue-10000000.csv", callback),
    csv("data/linked-list-queue-100.csv", callback),
    csv("data/linked-list-queue-1000.csv", callback),
    csv("data/linked-list-queue-10000.csv", callback),
    csv("data/linked-list-queue-100000.csv", callback),
    csv("data/linked-list-queue-1000000.csv", callback),
    csv("data/linked-list-queue-10000000.csv", callback),
    csv("data/object-queue-100.csv", callback),
    csv("data/object-queue-1000.csv", callback),
    csv("data/object-queue-10000.csv", callback),
    csv("data/object-queue-100000.csv", callback),
    csv("data/object-queue-1000000.csv", callback),
    csv("data/object-queue-10000000.csv", callback),
  ])
  return [
    array100,
    array1000,
    array10000,
    array100000,
    array1000000,
    array10000000,
    linkedList100,
    linkedList1000,
    linkedList10000,
    linkedList100000,
    linkedList1000000,
    linkedList10000000,
    object100,
    object1000,
    object10000,
    object100000,
    object1000000,
    object10000000,
  ]
}

export { loadDatasets }
