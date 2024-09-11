import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import * as echarts from 'echarts';
import { UserService } from '../../services/user-service';

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-register',
  templateUrl: './user-list.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getChartData().subscribe(data => {
      this.initializeBarChart(data);
      this.initializeStackedLineChart(data);
    });
  }

  private initializeBarChart(data: { name: string, value: number, year: number }[]): void {
    const chartDom = document.getElementById('barChart')!;
    const myChart = echarts.init(chartDom);

    const platforms = Array.from(new Set(data.map(item => item.name)));
    const years = Array.from(new Set(data.map(item => item.year)));

    const series: echarts.SeriesOption[] = years.map(year => ({
      name: String(year),
      type: 'bar',
      data: platforms.map(platform => {
        const item = data.find(d => d.name === platform && d.year === year);
        return item ? item.value : 0;
      })
    }));

    const option: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: years.map(String)
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: platforms,
        axisLabel: {
          rotate: 45,
          interval: 0
        }
      },
      yAxis: {
        type: 'value'
      },
      series: series
    };

    option && myChart.setOption(option);
  }

  private initializeStackedLineChart(data: { name: string, value: number, year: number }[]): void {
    const chartDom = document.getElementById('lineChart')!;
    const myChart = echarts.init(chartDom);
  
    const platforms = Array.from(new Set(data.map(item => item.name)));
    const years = Array.from(new Set(data.map(item => item.year)));
  
    const series: echarts.SeriesOption[] = platforms.map(platform => ({
      name: platform,
      type: 'line',
      stack: 'Total',
      data: years.map(year => {
        const item = data.find(d => d.name === platform && d.year === year);
        return item ? item.value : 0;
      })
    }));
  
    const option: EChartsOption = {
      title: {
        text: 'Stacked Line'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: platforms
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: years.map(String)
      },
      yAxis: {
        type: 'value'
      },
      series: series
    };
  
    option && myChart.setOption(option);
  }
  
}
