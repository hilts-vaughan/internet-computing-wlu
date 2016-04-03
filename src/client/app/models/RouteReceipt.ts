import {Point} from './Point'

export class RouteReceipt {
  private _points : Array<Point> = []
  constructor(results : any) {
    results.forEach((result) => {
      this._points.push(new Point(result[1], result[0]))
    })    
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

  get all() : Array<Point> {
    return this._points
  }

}
