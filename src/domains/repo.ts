export default interface IRepo {
  name: string;
}

export interface IDetailedRepo extends IRepo {
  readme: string;
}
