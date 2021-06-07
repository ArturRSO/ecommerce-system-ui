export class Order {

  public id: number;
  public storeId: number;

  constructor(id: number, storeId: number) {
    this.id = id;
    this.storeId = storeId;
  }
}
