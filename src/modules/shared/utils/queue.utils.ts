interface QueueItem {
  promise: () => Promise<any>;
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
}

export default class Queue {
  static queue: QueueItem[] = [];

  static pendingPromise: boolean = false;

  static workingOnPromise: boolean = false;

  static enqueue<T>(promise: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({
        promise,
        resolve,
        reject,
      });

      this.dequeue();
    });
  }

  static dequeue() {
    if (this.workingOnPromise) {
      return false;
    }

    const item = this.queue.shift();
    if (!item) {
      return false;
    }

    try {
      this.workingOnPromise = true;
      item.promise()
        .then((value) => {
          this.workingOnPromise = false;
          item.resolve(value);
          this.dequeue();
        })
        .catch((err) => {
          this.workingOnPromise = false;
          item.reject(err);
          this.dequeue();
        });
    } catch (err) {
      this.workingOnPromise = false;
      item.reject(err);
      this.dequeue();
    }

    return true;
  }
}
