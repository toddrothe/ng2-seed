import {Component} from 'angular2/core';
/// <reference path="../typings/browser/ambient/lodash/lodash.d.ts" />

import {NestedComponent} from './nested/nested.component.js';

@Component({
    selector: 'hg-tool',
    directives:[NestedComponent],
    providers:[],
    templateUrl: './app.component.html'
})
export class AppComponent {

  ngOnInit(){
    console.log(_.compact(["lodash ","is ",0,"working!"]));
  }

}
