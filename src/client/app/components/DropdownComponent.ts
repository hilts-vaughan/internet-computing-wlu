/**
 * Implements a material dropdown which enables us to be able to have elements
 * selected and changed at will.
 */

import {Component, Output, Input, EventEmitter, ElementRef, Renderer} from 'angular2/core';

@Component({
    selector: 'dropdown',
    providers: [],
    template: `
    <div class="input-field col s12">
      <select>
        <option selected disabled value="-1">Select an option</option>
        <option *ngFor="#item of collection">{{item}}</option>
      </select>
      <label>{{labelText}}</label>
    </div>
    `
})

export class DropdownComponent {
  @Output() optionSelected: EventEmitter<Number> = new EventEmitter();
  @Input() labelText : String = ""
  @Input() collection = []

  constructor(public elementRef: ElementRef, public renderer: Renderer) {

  }

  // Private rendering methods down below, trying to avoid anything crazy
  ngAfterViewInit() {
    var rawElement : Element = this.elementRef.nativeElement
    var element : any = window['$'](rawElement).find('select')

    // Invoke the material select life on it
    element.material_select()
    this._bind()
  }

  ngOnChanges() {
    // this._bind()
  }

  _bind() {
    var rawElement : Element = this.elementRef.nativeElement
    window['$'](rawElement).find("span").click((event : any) => {
      var index : number = window['$'](event.target).parent().index()
      if(index > 0) {
        this.optionSelected.emit(index - 1 ) // don't keep the default option
      }
    })
  }

  // TODO:   $('select').material_select('destroy'); on component wrecked
  // / teardown on a as-needed basis.

}
