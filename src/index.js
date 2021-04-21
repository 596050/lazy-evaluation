export default class Lazy {
  constructor() {
    this.queue = [];
    this.results = new Map();
  }

  /**
   * Lazily add functions to be executed on call of evaluate
   * @param {function} fn
   * @param  {...number} rest
   * @returns {Lazy}
   */
  add(fn, ...rest) {
    const storedFn = (args) => fn(...rest.concat(args));
    this.queue.push(storedFn);
    return this;
  }

  /**
   * Call all functions accumulated to operate on each element of an array
   * @param {number[]} arg
   * @returns {number[]}
   */
  evaluate(args) {
    args.forEach((arg) => {
      if (!this.results.has(arg)) {
        this.results.set(arg, { depth: 0, value: arg });
      }

      let { depth, value } = this.results.get(arg);

      for (let i = depth; i < this.queue.length; i += 1) {
        const func = this.queue[i];
        value = func(value);
        depth += 1;
      }

      this.results.set(arg, { depth, value });
    });
    return args.map((arg) => this.results.get(arg).value);
  }
}
