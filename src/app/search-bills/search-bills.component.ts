import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import { SearchBill, Bill } from './search.bills';
import { SearchBillService } from './search-bills.service';

@Component({
  selector: 'app-search-bills',
  templateUrl: './search-bills.component.html',
  styleUrls: ['./search-bills.component.css']
})
export class SearchBillsComponent implements OnInit {
  bills: Observable<SearchBill>;
  private searchTerms = new Subject<string>();

  constructor(
    private searchBillService: SearchBillService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.searchTerms
      .switchMap(term => this.bills = this.searchBillService.getSearchBillsPlain(term))
  }

  search(searchTerm: string) {
    var bills: Bill[];

    // this.searchBillService.getSearchBillsPlain(searchTerm).subscribe(result => {
    //   bills = result.results[0].bills;
    //   console.log(bills);
    // });

    this.searchTerms.next(searchTerm);

    this.snackBar.open('Searching bills...', 'Clear', {
      duration: 2000
    });
  }

  viewDetails() {
    console.log("Details");
  }

}
