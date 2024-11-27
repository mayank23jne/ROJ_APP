import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Chart , registerables} from 'chart.js';
import { ApiService } from 'src/app/services/api.service';
import { LoaderService } from 'src/app/services/loader.service';
import { ThemeService } from 'src/app/services/theme.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  @ViewChild('myChart') myChart!: ElementRef;
  private chart!: Chart; 
  testimonialSelectedTab = 'received';
  leadershipSelectedTab = 'friends';
  totalDonations: number=0;
  weeklyDonations: any;
  userType: string = '';
  
  testimonials: any = [];
  dashboardData: any=[];

  constructor(
    private themeService: ThemeService,
    private apiService: ApiService,
    private loader: LoaderService
  ) {}
  ngOnInit() {
   this.themeService.getUserType().subscribe(type => {
      this.userType = type;
   });
    this.getDashboardData();
    this.getTestimonialForAll();
  }
  getDashboardData() {
   
    if (this.userType == 'donor') {
      this.loader.showLoader();
      this.apiService.donorDashboard().subscribe({
        next: data => {
          this.dashboardData = data;
          console.log(this.dashboardData);
          this.loader.hideLoader();
        },
        error: err => {
          console.error('Error fetching dashboard data:', err);
          this.loader.hideLoader();
        }
      })
    }
  }
  getTestimonialForAll() {
    this.apiService.getTestimonialForAll().subscribe({
      next: (result) => {
        if(result.status)
         this.testimonials = result.data;
      },
      error:(error) => {
        console.error('Error fetching testimonials:', error);
      }
    })
  }
  ngAfterViewInit() {
    const ctx = this.myChart.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              data: [],
              borderColor: '#FF4B7E',
              backgroundColor: 'transparent',
              tension: 0.4,
              pointRadius: 0,
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              enabled: true,
              mode: 'index' as 'index',
              intersect: false,
              backgroundColor: 'white',
              titleColor: '#333',
              bodyColor: '#666',
              borderColor: '#e0e0e0',
              borderWidth: 1,
              padding: 10,
              displayColors: false,
              callbacks: {
                label: (context: any) => `${context.parsed.y} donations`,
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 2,
                color: '#999',
                font: { size: 12 },
              },
              grid: { color: '#f5f5f5' },
              border: { color: '#999', width: 1, display: true },
            },
            x: {
              grid: { display: false },
              ticks: { color: '#999', font: { size: 12 } },
              border: { color: '#999', width: 1, display: true },
            },
          },
        },
      });

      this.getWeeklyDonations();
    } else {
      console.error('Failed to get chart context.');
    }
  }
 getWeeklyDonations() {
    this.loader.showLoader();
    this.apiService.getWeeklyDonations().subscribe({
      next: (result) => {
        if (result.status) {
          this.weeklyDonations = Object.values(result.data).filter(
            (item: any) => item.days 
            );
          this.totalDonations = result.total_donations;
          this.updateChart();
        } else {
          console.warn('Invalid data format for weekly donations.');
        }
        this.loader.hideLoader();
      },
      error: (err) => {
        console.error('Error fetching weekly donations:', err);
        this.loader.hideLoader();
      },
    });
  }
    updateChart() {
      if (this.chart && this.weeklyDonations) {
        this.chart.data.datasets[0].data = this.weeklyDonations.map(  
          (data: any) => data.donate
        );
        console.log('Updated chart data:', this.chart.data.datasets[0].data);
        this.chart.update();
      }
    }

}
