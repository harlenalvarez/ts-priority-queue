import { describe, expect, test } from 'vitest';
import { PriorityQueue } from '../lib';

describe('Priority Queue', () => {
  test('Should enqueue highest priority to lowest value', () => {
    const nums = [3, 5, 9, 4, 1, 6, 2, 7, 8];
    const queue = new PriorityQueue<number>((a, b) => a - b);
    for (let num of nums) {
      queue.enqueue(num);
    }

    expect(queue.peek).toBe(1);
  });

  test('Should enqueue lowest priority to highest value', () => {
    const nums = [3, 5, 9, 4, 1, 6, 2, 7, 8];
    const queue = new PriorityQueue<number>((a, b) => b - a);
    for (let num of nums) {
      queue.enqueue(num);
    }

    expect(queue.peek).toBe(9);
  });

  test('Should enqueue highest priority to highest rating', () => {
    const foodLikes = [
      { name: 'sushi', rating: 4 },
      { name: 'chicken', rating: 4 },
      { name: 'beef', rating: 5 },
      { name: 'pork', rating: 1 }
    ];

    const queue = new PriorityQueue<typeof foodLikes[0]>((a, b) => b.rating - a.rating);
    for (let food of foodLikes) {
      queue.enqueue(food);
    }

    expect(queue.peek).toMatchObject({ name: 'beef', rating: 5 });
  });

  test('Should enqueue highest priority to lowest rating', () => {
    const foodLikes = [
      { name: 'sushi', rating: 4 },
      { name: 'chicken', rating: 4 },
      { name: 'beef', rating: 5 },
      { name: 'pork', rating: 1 }
    ];

    const queue = new PriorityQueue<typeof foodLikes[0]>((a, b) => a.rating - b.rating);

    for (let food of foodLikes) {
      queue.enqueue(food);
    }

    expect(queue.length).toBe(4);
    expect(queue.peek).toMatchObject({ name: 'pork', rating: 1 });
  });

  test('Should dequeue highest priority with lowest value', () => {
    const nums = [3, 5, 9, 4, 1, 6, 2, 7, 8];
    const queue = new PriorityQueue<number>((a, b) => a - b);
    for (let num of nums) {
      queue.enqueue(num);
    }

    let dequeueValue = queue.dequeue();
    expect(dequeueValue).toBe(1);
    dequeueValue = queue.dequeue();
    expect(dequeueValue).toBe(2);
    expect(queue.peek).toBe(3);
  });

  test('Should dequeue highest priority with highest value', () => {
    const nums = [3, 5, 9, 4, 1, 6, 2, 7, 8];
    const queue = new PriorityQueue<number>((a, b) => b - a);
    for (let num of nums) {
      queue.enqueue(num);
    }

    let dequeueValue = queue.dequeue();
    expect(dequeueValue).toBe(9);
    dequeueValue = queue.dequeue();
    expect(dequeueValue).toBe(8);
    expect(queue.peek).toBe(7);
  });

  test('Should dequeue lowest rating', () => {
    const foodLikes = [
      { name: 'sushi', rating: 4 },
      { name: 'chicken', rating: 4 },
      { name: 'beef', rating: 5 },
      { name: 'pork', rating: 1 }
    ];
    const queue = new PriorityQueue<typeof foodLikes[0]>((a, b) => a.rating - b.rating);
    for (let food of foodLikes) {
      queue.enqueue(food);
    }

    let dequeueValue = queue.dequeue();
    expect(dequeueValue).toMatchObject({ name: 'pork', rating: 1 });
    dequeueValue = queue.dequeue();
    expect(dequeueValue).toMatchObject({ name: 'sushi', rating: 4 });
    expect(queue.peek).toMatchObject({ name: 'chicken', rating: 4 });
  });

  test('Should dequeue highest rating', () => {
    const foodLikes = [
      { name: 'sushi', rating: 4 },
      { name: 'chicken', rating: 4 },
      { name: 'beef', rating: 5 },
      { name: 'pork', rating: 1 }
    ];
    const queue = new PriorityQueue<typeof foodLikes[0]>((a, b) => b.rating - a.rating);
    for (let food of foodLikes) {
      queue.enqueue(food);
    }

    let dequeueValue = queue.dequeue();
    expect(dequeueValue).toMatchObject({ name: 'beef', rating: 5 });
    dequeueValue = queue.dequeue();
    expect(dequeueValue).toMatchObject({ name: 'chicken', rating: 4 });
    expect(queue.peek).toMatchObject({ name: 'sushi', rating: 4 });
  });

  test('Should dequeue words starting with special first', () => {
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
      return aRating - bRating;
    });
    for (let event of events) {
      queue.enqueue(event);
    }

    let dequeueValue = queue.dequeue();
    expect(dequeueValue).toMatchObject({ name: 'Special - House Music', time: 22 });
    dequeueValue = queue.dequeue();
    expect(dequeueValue).toMatchObject({ name: 'Special - Live Music', time: 23 });
  });

  test('Should dequeue words starting with special first then by time', () => {
    const events = [
      { name: 'Dinner', time: 19 },
      { name: 'Special - House Music', time: 22 },
      { name: 'lunch', time: 12 },
      { name: 'breakfast', time: 7 },
      { name: 'morning cofee', time: 6 },
      { name: 'Special - Live Music', time: 23 }
    ];
    const queue = new PriorityQueue<typeof events[0]>((a, b) => {
      const aRating = a.name.startsWith('Special') ? 0 : 2;
      const bRating = b.name.startsWith('Special') ? 0 : 2;

      if (aRating == bRating) {
        // lowest time first
        return a.time - b.time
      }
      return aRating - bRating;
    });
    for (let event of events) {
      queue.enqueue(event);
    }

    let dequeueValue = queue.dequeue();
    expect(dequeueValue).toMatchObject({ name: 'Special - House Music', time: 22 });
    dequeueValue = queue.dequeue();
    expect(dequeueValue).toMatchObject({ name: 'Special - Live Music', time: 23 });
    expect(queue.peek).toMatchObject({ name: 'morning cofee', time: 6 });
  });

  test('Should enqueue and keep track of key', () => {
    const foodLikes = [
      { name: 'sushi', rating: 4 },
      { name: 'chicken', rating: 4 },
      { name: 'beef', rating: 5 },
      { name: 'pork', rating: 1 }
    ];
    const queue = new PriorityQueue<typeof foodLikes[0]>((a, b) => a.rating - b.rating, (item) => item.name);
    for (let food of foodLikes) {
      queue.enqueue(food);
    }

    expect(queue.hasItem(foodLikes[3])).toBe(true)
    expect((queue as any).keyTrack.size).toBe(foodLikes.length)
    expect((queue as any).keyTrack.get(foodLikes[3].name)).toBe(0)
    expect((queue as any).keyTrack.get(foodLikes[0].name)).toBe(1)
    expect((queue as any).keyTrack.get(foodLikes[1].name)).toBe(3)
    expect((queue as any).keyTrack.get(foodLikes[2].name)).toBe(2)

    queue.dequeue()
    expect(queue.hasItem(foodLikes[3])).toBe(false)
    expect((queue as any).keyTrack.size).toBe(foodLikes.length - 1)
    expect((queue as any).keyTrack.get(foodLikes[0].name)).toBe(0)
    expect((queue as any).keyTrack.get(foodLikes[1].name)).toBe(1)
    expect((queue as any).keyTrack.get(foodLikes[2].name)).toBe(2)
  });

  test('Should enqueue by item', () => {
    const foodLikes = [
      { name: 'sushi', rating: 4 },
      { name: 'chicken', rating: 4 },
      { name: 'beef', rating: 5 },
      { name: 'pork', rating: 1 }
    ];
    const queue = new PriorityQueue<typeof foodLikes[0]>((a, b) => a.rating - b.rating, (item) => item.name);
    for (let food of foodLikes) {
      queue.enqueue(food);
    }

    const chicken = queue.dequeueItem(foodLikes[1]);
    expect(chicken).not.toBeNull();
    expect(chicken!.name).toBe('chicken');
    expect(queue.hasItem(foodLikes[1])).toBe(false);
    const pork = queue.dequeueItem(foodLikes[3]);
    expect(pork).not.toBeNull();
    expect(pork!.name).toBe('pork');
    expect((queue as any).keyTrack.get(foodLikes[0].name)).toBe(0)
  });

  test('If has key should not duplicate values', () => {
    const foodLikes = [
      { name: 'sushi', rating: 4 },
      { name: 'chicken', rating: 4 },
      { name: 'beef', rating: 5 },
      { name: 'pork', rating: 1 }
    ];
    const queue = new PriorityQueue<typeof foodLikes[0]>((a, b) => a.rating - b.rating, (item) => item.name);
    for (let food of foodLikes) {
      queue.enqueue(food);
    }

    queue.enqueue(foodLikes[3]);
    expect(queue).toHaveLength(4);
  });

  test('Should dequeue by key', () => {
    const foodLikes = [
      { name: 'sushi', rating: 4 },
      { name: 'chicken', rating: 3 },
      { name: 'crab', rating: 2 },
      { name: 'beef', rating: 1 },
      { name: 'pork', rating: 5 }
    ];
    const queue = new PriorityQueue<typeof foodLikes[0]>((a, b) => b.rating - a.rating, a => a.name);
    for (let food of foodLikes) {
      queue.enqueue(food);
    }

    const crab = queue.dequeueByKey('crab');
    expect(crab).toMatchObject({ name: 'crab', rating: 2 });
    expect(queue.length).toBe(4);
    const pork = queue.dequeue();
    expect(pork?.name).toBe('pork');
    const sushi = queue.dequeue();
    expect(sushi?.name).toBe('sushi');
  });
})