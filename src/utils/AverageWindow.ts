/**
 * Helper class to calculate running average of the most recent n values
 */
export class AverageWindow {
  private maxSize: number;
  private currentAverage: number;
  private currentCount: number;
  private inputValues: (number | undefined)[];
  private totalItemsAdded: number = 0;
  constructor(size: number, startValue?: number) {
    this.maxSize = Math.max(1, size);
    this.inputValues = new Array<number>(this.maxSize);
    this.currentAverage = startValue ?? 0;
    this.currentCount = startValue === undefined ? 0 : 1;
    this.totalItemsAdded = this.currentCount;
    this.inputValues[0] = startValue;
  }

  /**
   * Can be used to get the current average value
   */
  public get currentValue(): number {
    return this.currentAverage;
  }

  /**
   *
   * @param value Add new value to the average window and updated current average
   */
  public addValue(value: number): void {
    const target = this.getNextIndex();
    const oldValue = this.inputValues[target];
    const newCount =
      oldValue === undefined ? this.currentCount + 1 : this.currentCount;

    this.inputValues[target] = value;

    this.currentAverage =
      this.currentAverage * (this.currentCount / newCount) +
      (value - (oldValue ?? 0)) / newCount;

    this.currentCount = newCount;
  }

  private getNextIndex(): number {
    return this.totalItemsAdded++ % this.maxSize;
  }
}
