export interface IDataSourceItem {
  price: number;
  ratio: number;
}

export interface IData extends IDataSourceItem {
  id: string;
  name: string;
  value: number;
}
