<a name="readme-top"></a>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Javascript Priority Queue ( Min / Max Heap ).

|Method | Time Complexity|
|-------|----------------|
|Peek   |  O(1)          |
|Enqueue|  O(logn)       |
|Dequeue|  O(logn)       |
|Clear  | O(1)           |


<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- GETTING STARTED -->
## Getting Started

### Installation

```npm
npm i @practicaljs/priority-queue
```

### Usage

Create a new priority queue class
```ts
  const queue = new PriorityQueue<number>((a, b) => a - b);
```
> To prioritize lower values use a-b, for higher values use b-a

example
```ts
  const nums = [3, 5, 9, 4, 1, 6, 2, 7, 8];
  const queue = new PriorityQueue<number>((a, b) => a - b);
  // [1, 2, 3....]
  const queue = new PriorityQueue<number>((a, b) => b - a);
  // [9, 8, 7....]
```

The same can be done for objects
```ts
  const foodLikes = [
    { name: 'sushi', rating: 4 },
    { name: 'chicken', rating: 4 },
    { name: 'beef', rating: 5 },
    { name: 'pork', rating: 1 }
  ];

  // prioritize by lower rating
  const queue = new PriorityQueue<typeof foodLikes[0]>((a, b) => a.rating - b.rating);
  // [{ name: 'pork', rating: 1 }, { name: 'sushi', rating: 4 }...]
  const queue = new PriorityQueue<typeof foodLikes[0]>((a, b) => b.rating - a.rating);
  // [ { name: 'beef', rating: 5 }, { name: 'chicken', rating: 4 }...]
```

You can also prioritize object by special logic, in this case the object you want to prioritize give it a lower value

```ts
  const events = [
    { name: 'Dinner', time: 19 },
    { name: 'Special - House Music', time: 22 },
    { name: 'lunch', time: 12 },
    { name: 'breakfast', time: 7 },
    { name: 'Special - Live Music', time: 23 }
  ];
  const queue = new PriorityQueue<typeof events[0]>((a, b) => {
    const aRating = a.name.startsWith('Special') ? 0 : 2;
    const bRating = b.name.startsWith('Special') ? 0 : 2;
    // if a == 0 and b == 2 it will be prioritized
    // if you want to prioritize non special events change the
    // order to bRating - aRating;
    return aRating - bRating;
  });

  //[{ name: 'Special - House Music', time: 22 }, { name: 'Special - Live Music', time: 23 }...]
```

You can also prioritize by secondary vaules

```ts
  const events = [
    { name: 'Dinner', time: 19 },
    { name: 'Special - House Music', time: 22 },
    { name: 'lunch', time: 12 },
    { name: 'breakfast', time: 7 },
    { name: 'Special - Live Music', time: 23 }
  ];
  const queue = new PriorityQueue<typeof events[0]>((a, b) => {
    const aRating = a.name.startsWith('Special') ? 0 : 2;
    const bRating = b.name.startsWith('Special') ? 0 : 2;
    if (aRating == bRating) {
      // Here I want earliest time first
      return a.time - b.time
    }
    return aRating - bRating;
  });

  //[{ name: 'Special - House Music', time: 22 }, { name: 'Special - Live Music', time: 23 },  { name: 'breakfast', time: 7}...]
```

You can also check and remove specific items if you provide a key to track

```ts
   const foodLikes = [
      { name: 'sushi', rating: 4 },
      { name: 'chicken', rating: 4 },
      { name: 'beef', rating: 5 },
      { name: 'pork', rating: 1 }
    ];
    // we'll track our objects by name ( this makes name unique )
    const queue = new PriorityQueue<typeof foodLikes[0]>(
      (a, b) => a.rating - b.rating,
      // Method takes the item and must return a string
      (item) => item.name
    );
    for (let food of foodLikes) {
      queue.enqueue(food);
    }
    // you can check if an item exists ( only if the key method was provided )
    if(queue.hasItem(foodLikes[3]))
      const pork = queue.dequeueItem(foodLikes[3]);
```
> If you provide a key to track it will also check for uniqueness when enqueing items and ignore if the item you are adding already exists and it's comparison value is the same