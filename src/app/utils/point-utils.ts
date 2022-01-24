export default class {
  constructor(private width: number) {}

  toPoint = (index: number) => {
    const x = index % this.width;

    return {
      x,
      y: (index - x) / this.width,
    };
  };

  toIndex = (x: number, y: number) => x + y * this.width;
}
