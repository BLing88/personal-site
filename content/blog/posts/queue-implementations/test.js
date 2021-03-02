const buildObjectQueue = () => ({
  head: 0,
  tail: 0,
  isEmpty() {
    return this.head === this.tail
  },
  enqueue(item) {
    this[this.tail] = item
    this.tail++
  },
  dequeue() {
    if (!this.isEmpty()) {
      const nextItem = this[this.head]
      this.head++
      return nextItem
    } else {
      throw new Error("Cannot dequeue empty queue")
    }
  },
})
const buildLinkedListQueue = () => ({
  head: null,
  tail: null,
  isEmpty() {
    return this.head === null
  },
  enqueue(item) {
    const nextNode = { val: item, next: null }
    if (this.isEmpty()) {
      this.head = nextNode
      this.tail = nextNode
    } else {
      this.tail.next = nextNode
      this.tail = nextNode
    }
  },
  dequeue() {
    if (!this.isEmpty()) {
      const nextItem = this.head.val
      this.head = this.head.next
      return nextItem
    } else {
      throw new Error("Cannot dequeue empty queue")
    }
  },
})
const buildArrayQueue = () => ({
  items: [],
  isEmpty() {
    return this.items.length === 0
  },
  enqueue(item) {
    this.items.push(item)
  },
  dequeue() {
    if (!this.isEmpty()) {
      return this.items.unshift()
    } else {
      throw new Error("Cannot dequeue empty queue")
    }
  },
})
const x = buildObjectQueue()
const w = buildObjectQueue()
const y = buildLinkedListQueue()
const z = buildArrayQueue()
x.enqueue(4)
y.enqueue("a")
y.a = 23
//console.log(%HaveSameMap(x, y))
console.log(%HaveSameMap(x, w))
w.enqueue("sd")
w.enqueue("3")
w.dequeue()
delete w[0]
console.log(%HaveSameMap(x, w))
let as = { a: "a", b: "c" }
let bs = { a: "a", b: "c" }
console.log(%HaveSameMap(as, bs))
delete bs["a"]
console.log(%HaveSameMap(as, bs))
