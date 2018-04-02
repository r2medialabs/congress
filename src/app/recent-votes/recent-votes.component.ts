import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';

import { RecentVotesService } from './recent-votes.service';
import { RecentVotes, Votes, Bill, Amendment, Democratic, Republican, Independent, Total } from './recent.votes';

@Component({
  selector: 'app-recent-votes',
  templateUrl: './recent-votes.component.html',
  styleUrls: ['./recent-votes.component.css']
})
export class RecentVotesComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns = ['chamber', 'bill-number', 'vote-type', 'date-time', 'result', 'voting-details'];
  public dataSource: any;

  dialogRef: any;

  constructor(
    private recentVotesService: RecentVotesService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {}

  ngOnInit() {

    this.getRecentVotes();

  }

  getRecentVotes() {
    
    var votes: Votes[];

    const recentVotesObservable = this.recentVotesService.getRecentVotesPlain();

    recentVotesObservable.subscribe(getresult => {
      votes = getresult.results.votes;
      this.dataSource = new MatTableDataSource<Votes>(votes);
      this.dataSource.sort = this.sort;
    });

  }

  viewDetails(row: any) {

    this.snackBar.open('Loading details...', 'Clear', {
      duration: 250
    });
    this.dialogRef = this.dialog.open(DetailsBillDialogComponent);
    this.dialogRef.componentInstance.selectedBill = row;

  }

  myAlert() {}

}

@Component({
  selector: 'app-selected-bill-dialog',
  templateUrl: './recent-votes-details.html',
  styleUrls: ['./recent-votes-details.css']
})

export class DetailsBillDialogComponent {

  selectedBill: Votes;
  
  constructor(
    public dialogRef: MatDialogRef<DetailsBillDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

}
