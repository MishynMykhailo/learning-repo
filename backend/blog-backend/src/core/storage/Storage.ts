export interface ReadOptions {
  offset?: number;
  limit?: number;
}

export abstract class Storage<T> {
  abstract init(): Promise<void>;
  abstract read(opts?: ReadOptions): Promise<T[]>;
  abstract write(data: T[]): Promise<void>;
  abstract count(): Promise<number>;
}
