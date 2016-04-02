export class Model {
  private _id : number;
  private _name : string;
  private _carid: number;
  private _year : number;
  private _range : number;

  constructor(id : number, name : string, carid : number, year : number, range : number) {
    this._id = id;
    this._name = name;
    this._carid = carid;
    this._year = year;
    this._range = range;
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

}
