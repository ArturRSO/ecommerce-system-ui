import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DateRange } from 'src/app/utils/validators/date-range.validator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges, OnInit {

  @Input() addButton = false;
  @Input() columns = [];
  @Input() data = [];
  @Input() dateFilter = false;
  @Input() headers = [];

  @Output() addRequest = new EventEmitter();
  @Output() dateFilterSent = new EventEmitter();
  @Output() dateFilterReset = new EventEmitter();
  @Output() objectSent = new EventEmitter();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public clickedRows = new Set<any>();
  public dataSource: MatTableDataSource<any>;
  public defaultDate = new Date();
  public form: UntypedFormGroup;
  public submitted = false;
  public validationMessages: any;

  constructor(
    private formBuilder: UntypedFormBuilder
  ) {
  }

  ngOnInit(): void {
    if (this.dateFilter) {
      this.buildForm();
      this.setValidationMessages();
    }
  }

  ngOnChanges(): void {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  get f() {
    return this.form.controls;
  }

  public addData(): void {
    this.addRequest.emit(true);
  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public clearDateFilter(): void {
    this.submitted = false;
    this.form.reset();
    this.dateFilterReset.emit(true);
  }

  public drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const dateRange = {
      startDate: this.f.startDate.value.toISOString().split("T")[0],
      endDate: this.f.endDate.value.toISOString().split("T")[0]
    }

    this.dateFilterSent.emit(dateRange);
  }

  public rowClick(rowData: any): void {
    this.objectSent.emit(rowData);
    this.clickedRows.add(rowData);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]]
    },
      {
        validator: DateRange('startDate', 'endDate')
      });
  }

  private setValidationMessages(): void {
    this.validationMessages = {
      startDate: [
        { type: 'required', message: 'Forneça a data de início' }
      ],
      endDate: [
        { type: 'required', message: 'Forneça a data final' },
        { type: 'dateRange', message: 'Data final não pode ser maior que a de início' }
      ]
    }
  }
}
