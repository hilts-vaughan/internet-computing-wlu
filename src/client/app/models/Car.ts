export class Car {
  private _id : number;
  private _name : string;
  constructor(id : number, name : string) {
    this._id = id;
    this._name = name;
  }

  /**
   * Returns the name of this car
   * @return {String} [description]
   */
  get id() : number {
    return this._id
  }

  get name() : string {
    return this._name;
  }

  toString() {
    return this._name
  }

}
