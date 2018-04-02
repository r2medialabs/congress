import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

import { RecentIntroducedService } from './recent-introduced.service';
import { RecentIntroduced, Bill } from './recent.introduced';

@Component({
  selector: 'app-recent-introduced',
  templateUrl: './recent-introduced.component.html',
  styleUrls: ['./recent-introduced.component.css']
})
export class RecentIntroducedComponent implements OnInit {

  public displayedColumns = ['bill-number', 'sponsor-name', 'date', 'category', 'status', 'latest-action'];
  public dataSource: any;

  dialogRef: any;

  constructor(
    private recentIntroducedService: RecentIntroducedService,
    private snackBar: MatSnackBar) {}

  ngOnInit() {

    this.getRecentIntroduced();

  }

  getRecentIntroduced() {
    
    var bills: Bill[];

    const recentIntroducedObservable = this.recentIntroducedService.getRecentIntroducedPlain();

    recentIntroducedObservable.subscribe(getresult => {
      bills = getresult.results[0].bills;
      this.dataSource = new MatTableDataSource<Bill>(bills);
    });

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewDetails(row: any) {
    
    this.snackBar.open('Loading details...', 'Clear', {
      duration: 250
    });

  }

  myAlert() {}

}
