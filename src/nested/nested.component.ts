import {Component} from 'angular2/core';

@Component({
    selector: 'nested-component',
    directives:[],
    providers:[],
    templateUrl: './nested/nested.component.html'
})

export class NestedComponent {

  ngOnInit(){
    console.log("nested component is working!");
  }

}
