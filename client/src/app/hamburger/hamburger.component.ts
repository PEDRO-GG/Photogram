import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-hamburger',
  templateUrl: './hamburger.component.html',
  styleUrls: ['./hamburger.component.css']
})
export class HamburgerComponent implements OnInit {
  @Input() isOpen?: boolean;
  @Output() changeOpenState = new EventEmitter<boolean>();
  
  
  constructor() { }
  
  ngOnInit(): void {
  }
  
  onClick(){
    this.changeOpenState.emit(!this.isOpen);
  }

}
