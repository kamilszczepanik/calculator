/*
Question:
    Write a utility that will GET a record from a REST API endpoint, perform 
    some operations to the data, then PUT the processed data to the same 
    endpoint.
    It should be possible to provide an array of record IDs that need to be
    processed. There should be a way to specify the maximum number of concurrent
    connections for both GET and PUT URLs.

Example:

    const utility = new Utility({
        url: '/api/records/',
        maxGet: 10,
        maxPut: 2,
        processFn: function (data) {
            data.processed = true;
            return data;
        }
    });

    utility.start([1, 2, 3, 4, ... , 499, 500]);
*/

/*

const empNumbers = Array.from({ length: 500 }, (_, i) => i + 1);

// GET
{
    empNo: 35,
    isProcessed: false
}

const mockGet = (empNo) => { return new Promise((res, rej) => { setTimeout(() => {
    return res({empNo: empNo});
}, 20) });
}

// perfrom processing

// PUT

const mockPut = (empNo) => { return new Promise((res, rej) => { setTimeout(() => {
    return res({empNo: empNo, isProcessed: true});
}, 50) });
}

{
    empNo: 35,
    isProcessed: true
}

*/

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor(value) {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);

    if (!this.first) {
      this.first = this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }

    this.length++;

    return this;
  }

  dequeue() {
    if (!this.first) return null;

    this.first = this.first.next;
    this.length--;

    if (this.length === 0) {
      this.last = null;
    }

    return this;
  }

  peek() {
    return this.first ? this.first.value : null;
  }

  get isEmpty() {
    return this.length === 0 ? true : false;
  }
}

// Your code here
class Utility {
  constructor({ url, maxGet, maxPut, processFn }) {
    this.url = url;
    this.maxGet = maxGet;
    this.maxPut = maxPut;
    this.processFn = processFn;
  }

  mockGet(empNo) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        console.log("Get called " + empNo);
        return res({ empNo: empNo });
      }, 20);
    });
  }

  mockPut(empNo) {
    return new Promise((res, rej) => {
      setTimeout(() => {
        console.log("Put called " + empNo);
        return res({ empNo: empNo, isProcessed: true });
      }, 50);
    });
  }

  // [1, 2, 3, 4, ... , 499, 500]

  delay(t = 10) {
    return new Promise((resolve) => {
      setTimeout(resolve, t);
    });
  }

  async getElements(array, queue) {
    await this.delay();
    let tempPromises = [];

    for (let i = 0; i < array.length; i++) {
      if (tempPromises.length < 10) {
        tempPromises.push(this.mockGet(array[i]));
      } else {
        const getResult = await Promise.all(tempPromises);
        for (let i = 0; i < getResult.length; i += 1) {
          queue.enqueue(getResult[i]);
        }
        tempPromises = [];
      }
      await this.delay();
    }
  }

  async putElements(queue, arrayLength) {
    await this.delay();
    let processedItems = 0;

    while (processedItems <= arrayLength) {
      const tempPromises = [];
      for (let j = 0; j < this.maxPut; j += 1) {
        const data = queue.dequeue();
        if (data) {
          // processing data here
          data.processed = true;
          tempPromises.push(mockPut(data));
        }
      }

      if (tempPromises.length > 0) {
        await Promise.all(tempPromises);
        processedItems += tempPromises.length;
      }

      await this.delay();
    }
  }

  async start(array) {
    const queue = new Queue();

    this.getElements(array, queue);
    this.putElements(queue, array.length);
  }
}

const utility = new Utility({
  url: "/api/records/",
  maxGet: 10,
  maxPut: 2,
  processFn: function (data) {
    data.processed = true;
    return data;
  },
});

const empNumbers = Array.from({ length: 50 }, (_, i) => i + 1);

utility.start(empNumbers);

// GET [1,2,3,4,5,6,7,8,9,10] - 20ms
// return [1,2,3,4,5,6,7,8,9,10]

// TO QUEUE [3,4],[5,6],[7,8],[9,10]

// PUT - 50ms
// [1,2]

// GET [10-20] - 20ms
// return [10-20]

// TO QUEUE [3-20]

// PUT - 50ms
// [1,2]

// GET [20-30] - 20ms
// return [20-30]

// TO QUEUE [5-30]

// PUT - 50ms
// [3,4] mockPut
