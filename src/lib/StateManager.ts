export type StateListener<T> = (data: T) => void;

/**
 * StateManager: Observer pattern implementation for global application state.
 * This allows modules (like Heatmaps or Clustering) to react to data changes
 * without being coupled to the fetch logic.
 */
export class StateManager<T> {
  private state: T;
  private listeners: StateListener<T>[] = [];

  constructor(initialState: T) {
    this.state = initialState;
  }

  setState(newState: Partial<T>): void {
    this.state = { ...this.state, ...newState };
    this.notify();
  }

  getState(): T {
    return this.state;
  }

  subscribe(listener: StateListener<T>): void {
    this.listeners.push(listener);
  }

  private notify(): void {
    this.listeners.forEach(listener => listener(this.state));
  }
}
