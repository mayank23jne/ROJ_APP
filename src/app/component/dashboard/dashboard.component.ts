import { Component, OnInit, OnDestroy, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Chart , registerables} from 'chart.js';
import { ThemeService } from 'src/app/services/theme.service';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {
  lineChart: any;
  @ViewChild('lineCanvas', { static: true }) lineCanvas!: ElementRef<HTMLCanvasElement>;
  private chart!: Chart; // Declare chart as a private member variable
  testimonialSelectedTab = 'received';
  leadershipSelectedTab = 'friends';
  totalDonations: number = 9;
  userType: string = '';
  
  testimonials: any[] = [
    {
      name: 'Swapnil Gupta',
      date: '27 Aug 2020',
      content: 'Liked your place for old age people, you all are really taking care of them very efficiently.'
    },
    {
      name: 'John Doe',
      date: '28 Aug 2020',
      content: 'Amazing facility and wonderful staff. Keep up the great work!'
    },
    {
      name: 'Jane Smith',
      date: '29 Aug 2020',
      content: 'The care and attention provided here is exceptional. Highly recommended!'
    }
  ];

  constructor(
    private themeService:ThemeService
  ) {}
 @ViewChild('myChart') myChart!: ElementRef;
  ngOnInit() {
   this.themeService.getUserType().subscribe(type => {
      this.userType = type;
    });
  }
   ngAfterViewInit() {
    const ctx = this.myChart.nativeElement.getContext('2d');
    console.log('test');
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          data: [0, 1, 1, 3, 2, 5, 6],
          borderColor: '#FF4B7E',
          backgroundColor: 'transparent',
          tension: 0.4,
          pointRadius: 0,
          borderWidth: 2
        }]
      },
      options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  },
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
                      label: (context: any) => `${context.parsed.y} donations`
                    }
                  }
                },
                scales: {
                      y: {
                        beginAtZero: true,
                        max: 10,
                        ticks: {
                          stepSize: 2,
                          color: '#999',
                          font: { size: 12 }
                        },
                        grid: {
                          color: '#f5f5f5'
                        },
                        border: {
                          color: '#999', 
                          width: 1,     
                          display: true 
                        },
                      },
                      x: {
                        grid: { display: false },
                        ticks: {
                          color: '#999',
                          font: { size: 12 }
                        },
                        border: {
                          color: '#999', 
                          width: 1,     
                          display: true  
                        }
                      }
                    }

              }
    });
  }
}
