import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { RepositoryService } from '../../repository/shared/repository.service';
import { CreateIssueComponent } from '../create-issue/create-issue.component';
import { Issue } from '../shared/issue.model';

@Component({
  selector: 'it-repository-issues',
  templateUrl: './repository-issues.component.html',
  styleUrls: ['./repository-issues.component.css']
})
export class RepositoryIssuesComponent implements OnInit {
  displayedColumns = ['title', 'description', 'status'];
  issues: Issue[];
  dataSource: MatTableDataSource<Issue>;
  repositoryId: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private repositoryService: RepositoryService,
    private dialog: MatDialog,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.repositoryId = +this.route.snapshot.paramMap.get('id');

    this.repositoryService
      .getIssuesByRepositoryId(this.repositoryId)
      .subscribe(result => {
        this.issues = result;
        this.dataSource = new MatTableDataSource(this.issues);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  openCreateIssueDialog() {
    const dialogRef = this.dialog.open(CreateIssueComponent, {
      hasBackdrop: false,
      width: '500px'
    });

    dialogRef.componentInstance.repositoryId = this.repositoryId;

    dialogRef.afterClosed().subscribe(newIssue => {
      if (newIssue !== '') {
        this.issues.push(newIssue);
        this.dataSource = new MatTableDataSource(this.issues);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        while (this.dataSource.paginator.hasNextPage()) {
          this.dataSource.paginator.nextPage();
        }
      }
    });
  }
}
