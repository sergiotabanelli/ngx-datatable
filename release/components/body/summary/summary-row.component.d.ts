import { OnChanges, PipeTransform, TemplateRef, Type } from '@angular/core';
export interface ISummaryColumn {
    summaryFunc?: (cells: any[]) => any;
    summaryTemplate?: TemplateRef<any>;
    summaryComponent?: Type<any>;
    prop: string;
    pipe?: PipeTransform;
}
export declare class DataTableSummaryRowComponent implements OnChanges {
    rows: any[];
    columns: ISummaryColumn[];
    rowHeight: number;
    offsetX: number;
    innerWidth: number;
    _internalColumns: ISummaryColumn[];
    summaryRow: {};
    ngOnChanges(): void;
    private updateInternalColumns;
    private updateValues;
    private getSummaryFunction;
}
