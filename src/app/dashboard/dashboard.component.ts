import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppService} from "../service/app.service";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  dataSet: any = [];
  showChart$: boolean = false;
  name: string = '';
  constructor(public appService: AppService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.appService.showIncidents.next(this.showChart$);
    }, 500);
  }

  ngOnDestroy() {
    clearInterval(Number(this.showChart$));
  }

  data(data: any) {
    this.dataSet.push(data);
  }

  selectedPoly(polyData: any) {
    this.dataSet = [];
    this.name = polyData[0][2];
    this.dataSet.push(polyData);
  }

  toggle(toggleValue: MatSlideToggleChange) {
    this.appService.toggle(toggleValue.checked);
    this.showChart$ = toggleValue.checked;
  }

  onChecked(event: boolean) {
    this.showChart$ = event;
  }

}
