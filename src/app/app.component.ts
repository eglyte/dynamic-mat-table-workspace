import { Component, ViewChild } from '@angular/core';
import {
  ContextMenuItem,
  DynamicMatTableComponent,
  PrintConfig,
  TableField,
  TablePagination,
  TableRow,
  TableSelectionMode,
  TableSetting
} from 'dynamic-mat-table';
import { BehaviorSubject } from 'rxjs';

const DATA = getData(1000);
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dynamic-mat-table';
  eventLog = [];
  // required
  fields: TableField<any>[] = [];
  dataSource = new BehaviorSubject<any[]>(DATA);
  // optional
  setting: TableSetting;
  rowActionMenu: ContextMenuItem[] = [];
  stickyHeader = true;
  showNoData = true;
  showProgress = true;
  pending = false;
  tableSelection: TableSelectionMode = 'none';
  conditionalClass = false;
  pagination: TablePagination = { pageIndex: 0, pageSize: 10 };
  enablingPagination = false;
  direction: 'rtl' | 'ltr' = 'ltr';
  printConfig: PrintConfig = { title: 'Print All Test Data' , showParameters: true };
  @ViewChild(DynamicMatTableComponent, {static: true}) table: DynamicMatTableComponent<TestElement>;

  constructor() {
    this.fields = [
      {name: 'row', type: 'number'},
      {name: 'name', header: 'Element Name' , sticky: 'start'},
      {name: 'weight'},
      {name: 'color'},
      {name: 'brand'}
    ];

    this.rowActionMenu.push(
      {
        name: 'Edit',
        text: 'ویرایش',
        color: 'primary',
        icon: 'edit',
        disabled: false,
        visible: true
      },
      {
        name: 'Delete',
        text: 'حذف',
        color: 'warn',
        icon: 'delete',
        disabled: false,
        visible: true
      }
    );
  }

  fetchData_onClick() {
    this.dataSource.next(DATA);
  }

  table_onChangeSetting(setting) {
    console.log(setting);
  }

  table_onRowActionChange(e) {
    this.eventLog.push(e);
  }

  columnSticky_onClick(columnSticky, type) {
    console.log(this.fields);

    if ( this.fields[columnSticky].sticky === type ) {
      this.fields[columnSticky].sticky = 'none';
    } else {
      this.fields[columnSticky].sticky = type;
    }
    console.log(this.fields);
  }

  tableSelection_onClick() {
    if (this.tableSelection === 'multi') {
      this.tableSelection = 'single';
    } else if (this.tableSelection === 'single') {
      this.tableSelection = 'none';
    } else {
      this.tableSelection = 'multi';
    }
  }

  table_onRowSelectionChange(e) {
    console.log(e);
  }

  addNewColumn_onClick() {
    this.fields.push({
      name: 'type', header: 'Car Type'
    });
    this.fields = this.fields.map(x => Object.assign({}, x));
  }

  addNewLongColumn_onClick() {
    this.fields.push({
      name: 'longText', header: 'Long Text'
    });
    this.fields = this.fields.map(x => Object.assign({}, x));
  }

  paginationMode_onClick() {
    this.enablingPagination = this.enablingPagination !== true;
  }

  direction_onClick() {
    if (this.direction === 'ltr') {
      this.direction = 'rtl';
    } else {
      this.direction = 'ltr';
    }
  }


}


export interface TestElement extends TableRow {
  row: number;
  name: string;
  weight: string;
  color: string;
  brand: string;
}

export function getData(n = 1000): TestElement[] {
  return Array.from({ length: n }, (v, i) => ({
    row: i + 1,
    name: `Element #${i + 1}`,
    weight: Math.floor(Math.random() * 100) + ' KG',
    color: (['Red', 'Green', 'Blue', 'Yellow', 'Magenta'])[Math.floor(Math.random() * 5)],
    brand: (['Irankhodro', 'SAIPA', 'Kerman Khodro', 'Zanjan Benz', 'Tehran PIKEY'])[Math.floor(Math.random() * 5)],
    type: (['SUV', 'Truck', 'Sedan', 'Van', 'Coupe' , 'Sports Car'])[Math.floor(Math.random() * 6)],
    longText: (['Overdub: Correct your voice recordings by simply typing. Powered by Lyrebird AI.',
     'Multitrack recording — Descript dynamically generates a single combined transcript.',
     'Our style of podcasting and editing wouldn’t be possible without Descript.',
     'Live Collaboration: Real time multiuser editing and commenting.',
     'Use the Timeline Editor for fine-tuning with fades and volume editing.',
     'Edit audio by editing text. Drag and drop to add music and sound effects.'])[Math.floor(Math.random() * 6)],
  }));
}
