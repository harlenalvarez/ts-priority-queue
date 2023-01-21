/**
 * Comparison call back compares two values and returns a number representing priority from highest to lowest
 * @returns number 1, 0, -1
 */
export type CompareTo<T> = (a: T, b: T) => number;

export class PriorityQueue<T> {
  private parentIndex = (index: number) => Math.ceil(index / 2) - 1;
  private leftIndex = (index: number) => index * 2 + 1;
  private rightIndex = (index: number) => index * 2 + 2;

  private heap: T[] = [];

  compare: CompareTo<T>
  constructor(compareCbk: CompareTo<T>) {
    this.compare = compareCbk;
    this.enqueue = this.enqueue.bind(this);
    this.dequeue = this.dequeue.bind(this);
    this.clear = this.clear.bind(this);
  }

  get peek() { return this.heap[0]; }
  get length() { return this.heap.length; }

  enqueue(obj: T) {
    this.heap.push(obj);
    let currentIndex = this.heap.length - 1;
    let parentIndex = this.parentIndex(currentIndex);
    while (parentIndex > -1 && this.compare(this.heap[parentIndex], this.heap[currentIndex]) > 0) {
      [this.heap[parentIndex], this.heap[currentIndex]] = [this.heap[currentIndex], this.heap[parentIndex]];
      [currentIndex, parentIndex] = [parentIndex, this.parentIndex(parentIndex)];
    }
  }

  dequeue() {
    const lastIndex = this.heap.length - 1;
    [this.heap[0], this.heap[lastIndex]] = [this.heap[lastIndex], this.heap[0]];
    let currentIndex = 0, leftIndex = this.leftIndex(currentIndex), rightIndex = this.rightIndex(currentIndex);
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
        [currentIndex, leftIndex, rightIndex] = [greaterPriorityIndex, this.leftIndex(greaterPriorityIndex), this.rightIndex(greaterPriorityIndex)];
      }
    }
    return this.heap.pop();
  }
  clear() {
    this.heap = [];
  }
}