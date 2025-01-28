export class ExternalProperty<T> {
  private value: T = this.initialValue;
  private callbacks: ((newValue: T) => void)[] = [];

  constructor(private readonly initialValue: T) {}

  update(newValue: T) {
    this.value = newValue;
    this.callbacks.forEach((callback) => callback(newValue));
  }

  onValueChange(callback: (newValue: T) => void) {
    this.callbacks.push(callback);
    callback(this.value);
  }
}
