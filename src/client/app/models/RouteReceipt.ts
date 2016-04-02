import {Point} from './Point'

export class RouteReceipt {
  private _points : Array<Point>
  constructor(points : Array<Point>) {
    this._points = points
  }

  get waypoints() : Array<Point> {
    return this._points.slice(1, this._points.length - 1)
  }

  get first() : Point {
    return this._points[0]
  }

  get last() : Point {
    return this._points[this._points.length - 1]
  }

}
