import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  MatAutocompleteModule,
          MatButtonModule,
          MatButtonToggleModule,
          MatCardModule,
          MatCheckboxModule,
          MatChipsModule,
          MatDatepickerModule,
          MatDialogModule,
          MatDividerModule,
          MatExpansionModule,
          MatGridListModule,
          MatIconModule,
          MatInputModule,
          MatListModule,
          MatMenuModule,
          MatNativeDateModule,
          MatPaginatorModule,
          MatProgressBarModule,
          MatProgressSpinnerModule,
          MatRadioModule,
          MatRippleModule,
          MatSelectModule,
          MatSidenavModule,
          MatSliderModule,
          MatSlideToggleModule,
          MatSnackBarModule,
          MatSortModule,
          MatStepperModule,
          MatTableModule,
          MatTabsModule,
          MatToolbarModule,
          MatTooltipModule, 
          MAT_LABEL_GLOBAL_OPTIONS } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SenateMemberService } from './senate-members/senate.member.service';
import { SenateMembersComponent, DetailsSenateMemberDialogComponent, CompareSenateMembersDialogComponent } from './senate-members/senate-members.component';
import { HouseMembersComponent, DetailsHouseMemberDialogComponent, CompareHouseMembersDialogComponent } from './house-members/house-members.component';
import { HouseMemberService } from './house-members/house.member.service';
import { SpecificMemberService } from './member-detail/member-detail.service';
import { CompareMembersService } from './compare-members/compare-members.service';
import { RecentVotesComponent, DetailsBillDialogComponent } from './recent-votes/recent-votes.component';
import { RecentVotesService } from './recent-votes/recent-votes.service';
import { RecentIntroducedComponent } from './recent-introduced/recent-introduced.component';
import { RecentIntroducedService } from './recent-introduced/recent-introduced.service';
import { SearchBillsComponent } from './search-bills/search-bills.component';
import { SearchBillService } from './search-bills/search-bills.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IntroComponent } from './intro/intro.component';

@NgModule({
  declarations: [
    AppComponent,
    SenateMembersComponent,
    HouseMembersComponent,
    DetailsSenateMemberDialogComponent,
    DetailsHouseMemberDialogComponent,
    CompareSenateMembersDialogComponent,
    CompareHouseMembersDialogComponent,
    RecentVotesComponent,
    RecentIntroducedComponent,
    DetailsBillDialogComponent,
    SearchBillsComponent,
    DashboardComponent,
    IntroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    NgxChartsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    AppRoutingModule
  ],
    providers: [
      SenateMemberService,
      HouseMemberService,
      SpecificMemberService,
      CompareMembersService,
      RecentVotesService,
      RecentIntroducedService,
      SearchBillService,
      FormBuilder,
      // {provide: MAT_LABEL_GLOBAL_OPTIONS, useValue: {float: 'always'}}
    ],
    bootstrap: [ AppComponent ],
    entryComponents: [ 
      DetailsSenateMemberDialogComponent, 
      DetailsHouseMemberDialogComponent,
      CompareSenateMembersDialogComponent,
      CompareHouseMembersDialogComponent,
      DetailsBillDialogComponent
    ]
})

export class AppModule { }
