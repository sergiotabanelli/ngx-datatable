import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  Inject,
  Host,
  forwardRef
} from "@angular/core";
import { DATATABLE_CELL_CONTEXT } from "../../src";

@Component({
  selector: "my-summary",
  template: `
    <div class="name-container">
      <div
        class="chip"
        *ngFor="let name of cellCtx.column.customContext.parent.getNames()"
      >
        <span class="chip-content">{{ name }}</span>
      </div>
    </div>
  `
})
export class MySummaryComponent {
  constructor(@Inject(DATATABLE_CELL_CONTEXT) public cellCtx: any) {}
}

@Component({
  selector: "summary-row-custom-cell-demo",
  template: `
    <div>
      <h3>
        Summary Row with Custom cell component
        <small>
          <a
            href="https://github.com/swimlane/ngx-datatable/blob/master/demo/summary/summary-row-custom-template.component.ts"
          >
            Source
          </a>
        </small>
      </h3>
      <ngx-datatable
        class="material"
        [summaryRow]="true"
        [summaryHeight]="'auto'"
        [columns]="columns"
        [columnMode]="'force'"
        [headerHeight]="50"
        [rowHeight]="'auto'"
        [rows]="rows"
      >
      </ngx-datatable>
    </div>
  `,
  styleUrls: ["./summary-row-custom-template.component.scss"]
})
export class SummaryRowCustomCellComponent {
  rows = [];

  columns = [
    {
      prop: "name",
      summaryFunc: () => null,
      summaryComponent: MySummaryComponent,
      customContext: {parent: this}
    },
    { name: "Gender", summaryFunc: cells => this.summaryForGender(cells) },
    { prop: "age", summaryFunc: cells => this.avgAge(cells) }
  ];

  constructor() {
    this.fetch(data => {
      this.rows = data.splice(0, 5);
    });
  }

  fetch(cb) {
    const req = new XMLHttpRequest();
    req.open("GET", `assets/data/company.json`);

    req.onload = () => {
      cb(JSON.parse(req.response));
    };

    req.send();
  }

  getNames(): string[] {
    return this.rows
      .map(row => row["name"])
      .map(fullName => fullName.split(" ")[1]);
  }

  private summaryForGender(cells: string[]) {
    const males = cells.filter(cell => cell === "male").length;
    const females = cells.filter(cell => cell === "female").length;

    return `males: ${males}, females: ${females}`;
  }

  private avgAge(cells: number[]): number {
    const filteredCells = cells.filter(cell => !!cell);
    return (
      filteredCells.reduce((sum, cell) => (sum += cell), 0) /
      filteredCells.length
    );
  }
}
