import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  options: any;
  data: any;
  @Input() mapData = [];

  constructor() { }

  ngOnInit(): void {
    this.initChart();

    setInterval(() => {
      this.updateChart();
    }, 500);
  }

  private initChart() {
    this.options = {
      chart: {
        type: 'multiBarChart',
        height: 450,
        margin: {
          top: 20,
          right: 20,
          bottom: 50,
          left: 55
        },
        showControls: false,
        noData: 'No data available please select a layer on the map',
        title: {
          enable: true,
          text: 'place of click'
        },
        x: (d: any) => {
          return d[0];
        },
        y: (d: any) => {
          return d[1];
        },
        showValues: true,
        valueFormat: (d: any) => {
          return d3.format(',.0f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'Year',
          showMaxMin: false,
          axisLabelDistance: -5,
          tickFormat: (d: any) => {
            return d3.time.format('%Y')(new Date(d));
          },
        },
        yAxis: {
          axisLabel: 'Deaths',
          tickFormat: (d: any) => {
            return d3.format(',.0f')(d);
          },
          axisLabelDistance: -10
        }
      }
    };
  }


  private updateChart() {
    setTimeout(() => {
      this.data = [{
        key: 'deaths',
        values: this.mapData[0] ? this.mapData[0] : [],
      }];
    }, 1000);
  }
}
