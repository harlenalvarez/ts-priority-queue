/**
 * Comparison call back compares two values and returns a number representing priority from highest to lowest
 * @returns number 1, 0, -1
 */
export type CompareTo<T> = (a: T, b: T) => number;
export type Key<T> = (item: T) => string

export class PriorityQueue<T> {
  private parentIndex = (index: number) => Math.ceil(index / 2) - 1;
  private leftIndex = (index: number) => index * 2 + 1;
  private rightIndex = (index: number) => index * 2 + 2;

  private getKey?: Key<T>;
  private heap: T[] = [];
  private keyTrack = new Map<string, number>();

  compare: CompareTo<T>
  constructor(compareCbk: CompareTo<T>, key?: Key<T>) {
    this.compare = compareCbk;
    this.enqueue = this.enqueue.bind(this);
    this.dequeue = this.dequeue.bind(this);
    this.clear = this.clear.bind(this);
    this.hasItem = this.hasItem.bind(this);
    this.dequeueByIndex = this.dequeueByIndex.bind(this);
    this.dequeueItem = this.dequeueItem.bind(this);
    this.getKey = key
  }

  get peek() { return this.heap[0]; }
  get length() { return this.heap.length; }

  hasItem(item: T) {
    if (!this.getKey) return false
    return this.keyTrack.has(this.getKey(item))
  }

  enqueue(obj: T) {
    // if we have a key and this item already exists first remove it then re-add it
    if (this.getKey && this.hasItem(obj)) {
      // if item resusts in the same comparison value then no need to re-add
      const savedItem = this.heap[this.keyTrack.get(this.getKey(obj))!]
      if (this.compare(obj, savedItem) === 0) {
        return
      }
      this.dequeueItem(obj);
    }
    this.heap.push(obj);
    let currentIndex = this.heap.length - 1;
    if (this.getKey) {
      // keep track of this key current index
      this.keyTrack.set(this.getKey(obj), currentIndex)
    }
    let parentIndex = this.parentIndex(currentIndex);
    while (parentIndex > -1 && this.compare(this.heap[parentIndex], this.heap[currentIndex]) > 0) {
      [this.heap[parentIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[parentIndex]];
      if (this.getKey) {
        const parentIndexKey = this.getKey(this.heap[parentIndex])
        this.keyTrack.set(parentIndexKey, parentIndex)
        this.keyTrack.set(this.getKey(this.heap[currentIndex]), currentIndex)
      }

      [currentIndex, parentIndex] = [parentIndex, this.parentIndex(parentIndex)];
    }
  }

  private dequeueByIndex(index: number) {
    const lastIndex = this.heap.length - 1;
    [this.heap[index], this.heap[lastIndex]] = [this.heap[lastIndex], this.heap[index]];
    if (this.getKey) {
      this.keyTrack.set(this.getKey(this.heap[index]), index);
      this.keyTrack.set(this.getKey(this.heap[lastIndex]), lastIndex);
    }
    let currentIndex = index, leftIndex = this.leftIndex(currentIndex), rightIndex = this.rightIndex(currentIndex);
    while (leftIndex < lastIndex || rightIndex < lastIndex) {
      let greaterPriorityIndex = -1;
      if (leftIndex < lastIndex && rightIndex < lastIndex) {
        // we want to make the compare consistent with a and b, so if a-b means descending b-a means ascending values
        // because of this if compare returns > 0, the left argument
        greaterPriorityIndex = this.compare(this.heap[leftIndex], this.heap[rightIndex]) > 0 ? rightIndex : leftIndex;
      }
      else if (leftIndex < lastIndex) {
        greaterPriorityIndex = leftIndex;
      }
      else {
        greaterPriorityIndex = rightIndex;
      }

      const currentC = this.compare(this.heap[greaterPriorityIndex], this.heap[currentIndex]);
      if (currentC > 0) break;
      if (currentC < 1) {
        [this.heap[currentIndex], this.heap[greaterPriorityIndex]] = [this.heap[greaterPriorityIndex], this.heap[currentIndex]];
        if (this.getKey) {
          this.keyTrack.set(this.getKey(this.heap[currentIndex]), currentIndex);
          this.keyTrack.set(this.getKey(this.heap[greaterPriorityIndex]), greaterPriorityIndex);
        }
        [currentIndex, leftIndex, rightIndex] = [greaterPriorityIndex, this.leftIndex(greaterPriorityIndex), this.rightIndex(greaterPriorityIndex)];
      }
    }
    const item = this.heap.pop()
    if (this.getKey && item) {
      this.keyTrack.delete(this.getKey(item))
    }
    return item;
  }

  dequeueItem(item: T) {
    if (!this.getKey) return null;
    if (!this.hasItem(item)) return null;

    const index = this.keyTrack.get(this.getKey(item))!;
    return this.dequeueByIndex(index);
  }

  dequeue() {
    return this.dequeueByIndex(0);
  }

  clear() {
    this.heap = [];
    this.keyTrack.clear();
  }
}