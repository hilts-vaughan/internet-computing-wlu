import {Point} from './Point'

/**
 * A route request is something that ultimately is a transient control that
 * will eventually route requests to the server.
 */
export class RouteRequest {
  private _start : Point;
  private _startRaw : String;

  private _end : Point;
  private _endRaw : String;
  
  get startingLocation() : String  {
      return this._startRaw;
  }

  set startingLocation(value) {
    // Translate this into something usable
    this._start = new Point(0, 0)
    this._startRaw = value
  }

  get endingLocation() : String {
    return this._endRaw
  }
  set endingLocation(value) {
    this._end = new Point(0, 0)
    this._endRaw = value
  }

}
