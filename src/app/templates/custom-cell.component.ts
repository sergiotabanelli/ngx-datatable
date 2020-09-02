import { Component, TemplateRef, ViewChild, Inject } from '@angular/core';
import { DATATABLE_CELL_CONTEXT, DATATABLE_HEADER_CELL_CONTEXT } from 'projects/swimlane/ngx-datatable/src/public-api';

@Component({
  selector: 'my-cell',
  template: `
    <img *ngIf="cellCtx.value === 'male'" width="150" src="https://media.giphy.com/media/I8nepxWwlEuqI/giphy.gif" />
    <img *ngIf="cellCtx.value === 'female'" width="150" src="https://media.giphy.com/media/sxSVG3XHf7yww/giphy.gif" />
  `
})
export class MyCellComponent {
  constructor(@Inject(DATATABLE_CELL_CONTEXT) public cellCtx: any) {}
}

@Component({
  selector: 'my-header',
  template: ` <strong>Fancy</strong>: {{ headerCtx.column.name }} !! `
})
export class MyHeaderComponent {
  constructor(@Inject(DATATABLE_HEADER_CELL_CONTEXT) public headerCtx: any) {}
}

@Component({
  selector: 'custom-cell-demo',
  template: `
    <div>
      <h3>
        Custom cell component via Column Property
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/demo/templates/template-obj.component.ts"
            target="_blank"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [rows]="rows"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [footerHeight]="50"
        [rowHeight]="'auto'"
      >
      </ngx-datatable>
    </div>
  `
})
export class CustomCellComponent {
  rows = [];
  columns = [
    {
      cellComponent: MyCellComponent,
      headerComponent: MyHeaderComponent,
      name: 'Gender'
    }
  ];

  constructor() {
    this.fetch(data => {
      this.rows = data.splice(0, 5);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }
}
