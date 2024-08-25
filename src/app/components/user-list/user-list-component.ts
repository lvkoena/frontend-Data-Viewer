import { Component } from '@angular/core';
import { UserService } from '../../services/user-service';
import { User } from '../../interfaces/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list-component.html',
  styleUrl: './user-list-component.css'
})

export class UserListComponent {

  public users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
      console.log('Fetched Users:', this.users);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { RegisterService } from 'src/app/services/register.service';
import * as echarts from 'echarts';

type EChartsOption = echarts.EChartsOption;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getChartData().subscribe(data => {
      this.initializePieChart(data);
      this.initializeLineChart(data);
    });
  }

  private initializePieChart(data: { name: string, value: number }[]): void {
    const chartDom = document.getElementById('main')!;
    const myChart = echarts.init(chartDom);
    const option: EChartsOption = {
      title: {
        text: 'Referer of a Website',
        subtext: 'Tech Stack Data from MongoDB',
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    option && myChart.setOption(option);
  }

  private initializeLineChart(data: { name: string, value: number }[]): void {
    const chartDom = document.getElementById('lineChart')!;
    const myChart = echarts.init(chartDom);
    const option: EChartsOption = {
      title: {
        text: 'Stacked Line Chart',
      },
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: data.map(item => item.name),  // Extract names for legend
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: data.map(item => ({
        name: item.name,
        type: 'line',
        stack: 'Total',
        data: [item.value, item.value, item.value, item.value, item.value, item.value, item.value],  // Simplified for example
      })),
    };

    option && myChart.setOption(option);
  }
}

