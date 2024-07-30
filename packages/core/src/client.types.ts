export interface IClient {
  listFiles(): Promise<string[]>;
}
