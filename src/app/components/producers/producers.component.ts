import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

declare let jquery: any;
declare let $: any;

@Component({
  selector: 'app-producers',
  templateUrl: './producers.component.html',
  styleUrls: ['./producers.component.css']
})
export class ProducersComponent implements OnInit {
  producers = null;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get(environment.apiUrl + '/producers').subscribe(data => {
      this.producers = data;
      console.log(this.producers);

      const dataPie = [];
      const dta = [];
      const ticks = [];
      const dataset = [];
      let i = 0;

      for (const producer of this.producers) {
        dataPie.push({label: producer.name, data: producer.count});
        i++;
        dta.push([i, producer.count]);
        ticks.push([i, producer.name]);
      }
      dataset.push([{ label: '2012 Average Temperature', data: dta, color: '#5482FF' }]);

      $.plot($('#flot-bar-chart'), dataPie, {
        series: {
          pie: {
            show: true,
            innerRadius: 0.2,
            label: {
              show: true
            }
          },
        },
        grid: {
          hoverable: true
        },
        tooltip: true,
        tooltipOpts: {
          content: '%p.0%, %s',
          shifts: {
            x: 20,
            y: 0
          },
          defaultTheme: false
        }
      });
    });
  }

}
