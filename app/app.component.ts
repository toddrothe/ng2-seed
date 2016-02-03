import {Component} from 'angular2/core';
// <reference path="../typings/browser/ambient/lodash/lodash.d.ts" /> // not working yet

@Component({
    selector: 'hg-tool',
    directives:[],
    providers:[],
    template: `
    <h1 class="redHeader">Welcome</h1>
    <button class="ui button"> Follow </button>
    `
})
export class AppComponent {

  ngOnInit(){
    console.log(_.compact(["lodash ","is ",0,"working!"]));
  }

}
