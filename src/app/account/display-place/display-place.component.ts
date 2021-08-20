import { Component, Input, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.model';
import { Place } from 'src/app/models/place.model';

@Component({
  selector: 'app-display-place',
  templateUrl: './display-place.component.html',
  styleUrls: ['./display-place.component.scss']
})
export class DisplayPlaceComponent implements OnInit {

  constructor() { }

  @Input()
  place : Place;
  @Input()
  event : Event;
  @Input()
  poles : any;

  ngOnInit(): void {
    console.log({placeReceived : this.place});
    console.log({eventReceived : this.event});
    console.log({polesReceived : this.poles});
  }

  colorArr = ["orange", "red", "green"];
  textArr = ["Place non encore traitée", "Place refusée", "Place acceptée"];

  colorAccordingToStatus(status : number) {
    return this.colorArr[status + 1];
  }

  textAccordingToStatus(status : number) {
    return this.textArr[status + 1];
  }

}
