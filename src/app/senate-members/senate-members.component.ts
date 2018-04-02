import { Component, OnInit, ViewChild, Inject, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';

import { SenateMember, Member } from './senate.member';
import { SenateMemberService } from './senate.member.service';
import { SpecificMemberService } from '../member-detail/member-detail.service';
import { SpecificMember, Roles, GeneralMember, Subcommittee, Committee } from '../member-detail/specific.member';
import { CompareMember, ComparedVotes } from '../compare-members/compare.member';
import { CompareMembersService } from '../compare-members/compare-members.service';
import { MemberVotes, InMemRecord } from '../compare-members/compare.votes';

@Component({
  selector: 'app-senate-members',
  templateUrl: './senate-members.component.html',
  styleUrls: ['./senate-members.component.css']
})

export class SenateMembersComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  public displayedColumns = ['select', 'title', 'last-name', 'first-name', 'state', 'next', 'party', 'details'];
  public dataSource: any;
  selection = new SelectionModel<Member>(true, []);

  dialogRef: any;
  senateMember: Member;
  disabled: boolean = true;
  

  constructor(
    private senateMemberService: SenateMemberService,
    private specificMemberService: SpecificMemberService,
    private compareMembersService: CompareMembersService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar){}

  ngOnInit(): void {
    this.getSenateMembers();
    this.selection.onChange.subscribe((member) => {
      this.disabled = this.selection.selected.length === 2 ? false:true;
    });
  }
  
  getSenateMembers() {
    
    var members: Member[];
    
    const senateMemberObservable = this.senateMemberService.getSenateMembersPlain();
    
    senateMemberObservable.subscribe(getresult => {
      members = getresult.results[0].members;
      this.dataSource = new MatTableDataSource<Member>(members);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  
    // var lmem1: Member[];
  
    // senmemObser.map( getresult => {
    //   return getresult.results[0].num_results})
    //   .subscribe(onlymembers => {
    //     console.log(onlymembers);
    //   }
    // );

  }

  clearSelection() {
    this.selection.clear()
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  viewDetails(row: any) {
    this.specificMemberService.getSpecificMembersPlain(row.id).subscribe(result => {
      this.dialogRef = this.dialog.open(DetailsSenateMemberDialogComponent, {
        data: result.results[0]
      });
    });
    this.snackBar.open('Loading details...', 'Clear', {
      duration: 350
    });
  }
    
  compareMembers(id: string) {
    // this.compareMembersService.populateMemTable([this.selection.selected[0].id, this.selection.selected[1].id],420).then(val => {
          this.compareMembersService.getCompareSenateMembersPlain(this.selection.selected[0].id, this.selection.selected[1].id).subscribe(result => {
            this.dialogRef = this.dialog.open(CompareSenateMembersDialogComponent, {
              data: result.results[0],
            });
            this.dialogRef.componentInstance.firstMember = this.selection.selected[0];
            this.dialogRef.componentInstance.secondMember = this.selection.selected[1];
          });
    // });

    this.snackBar.open('Loading votes...', 'Clear', {
      duration: 4000
    });
  }
  
  myAlert() {}
  
}

@Component({
  selector: 'app-selected-member-dialog',
  templateUrl: '../member-detail/member-detail.component.html',
  styleUrls: ['../member-detail/member-detail.component.css']
})

export class DetailsSenateMemberDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DetailsSenateMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  getColor(party) { 
    switch (party) {
      case 'R':
        return 'blue';
      case 'D':
        return 'red';
      case 'I':
        return 'darkgrey';
    }
  }

}

@Component({
  selector: 'app-compare-members-dialog',
  templateUrl: '../compare-members/compare-members.component.html',
  styleUrls: ['../compare-members/compare-members.component.css']
})

export class CompareSenateMembersDialogComponent {

  public single: any[];
  public showLegend = false;
  public gradient = false;
  public colorScheme = {
    domain: ['#378D3B', '#D22E2E', '#2F3E9E', '#0096A6', '#F47B00', '#606060']
  }; 
  public showLabels = false;
  public explodeSlices = false;
  public doughnut = false;

  public displayedColumns = ['bill-number', 'first-member-votes', 'second-member-votes', 'bill-description'];
  public dataSource: any;

  firstMember: Member;
  secondMember: Member;

  showSpinner: boolean = true;
  tDisabled: boolean = true;
  sDisabled: boolean = true;
  selectedTab: number;

  tabledetailsdata;

  @ViewChild('resizedDiv') resizedDiv:ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<CompareSenateMembersDialogComponent>,
    public compareMembersService: CompareMembersService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.single = new Array();
    }
    
  ngOnInit() {
    this.single.push({name: "Agreeing Votes", value: this.data.common_votes - this.data.disagree_votes});
    this.single.push({name: "Disagreeing Votes", value: this.data.disagree_votes});
  }

  closeDialog() {
    this.compareMembersService.emptyArray();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
    if (tabChangeEvent.index === 1) {
      this.showStats();
    }
  }

  async showStats() {
    this.selectedTab = 1;
    this.tDisabled = false;

    this.snackBar.open('Loading details...', 'Clear', {
      duration: 1000
    });

    this.compareMembersService.populateMemTable(
      [
        this.firstMember.id, 
        this.secondMember.id
      ], 
      this.data.common_votes+20
    )
      .then(val => {
        this.compareMembersService.querythetable().then(result=> {
          this.tabledetailsdata = result;        
          this.dataSource = new MatTableDataSource<InMemRecord>(this.tabledetailsdata);
          this.dataSource.paginator = this.paginator;
          this.sDisabled = false;
        });
      });
    // this.tabledetailsdata = [];

    // this.compareMembersService.querythetable().then(result => {
    //   this.tabledetailsdata = result;
    //   this.tDisabled = false;
    //   this.selectedTab = 1;
    //   this.snackBar.open('Loading details...', 'Clear', {
    //     duration: 1000
    //   });
    //   setTimeout(() => {
    //     this.dataSource = new MatTableDataSource<InMemRecord>(this.tabledetailsdata);
    //     this.dataSource.paginator = this.paginator;
    //     this.sDisabled = false;
    //   }, 1000);
    // });
  }

  getColor(party) { 
    switch (party) {
      case 'R':
        return 'blue';
      case 'D':
        return 'red';
      case 'I':
        return 'darkgrey';
    }
  }

}
