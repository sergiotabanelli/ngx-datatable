import { EventEmitter, ChangeDetectorRef, InjectionToken, Injector, OnInit } from '@angular/core';
import { SortDirection, SortType, SelectionType, TableColumn } from '../../types';
/**
 * Injection token that used to pass the cell context to custom components.
 */
export declare const DATATABLE_HEADER_CELL_CONTEXT: InjectionToken<any>;
export declare class DataTableHeaderCellComponent implements OnInit {
    private cd;
    private injector;
    sortType: SortType;
    sortAscendingIcon: string;
    sortDescendingIcon: string;
    isTarget: boolean;
    targetMarkerTemplate: any;
    targetMarkerContext: any;
    _allRowsSelected: boolean;
    allRowsSelected: any;
    selectionType: SelectionType;
    column: TableColumn;
    headerHeight: number;
    sorts: any[];
    sort: EventEmitter<any>;
    select: EventEmitter<any>;
    columnContextmenu: EventEmitter<{
        event: MouseEvent;
        column: any;
    }>;
    readonly columnCssClasses: any;
    readonly name: string;
    readonly minWidth: number;
    readonly maxWidth: number;
    readonly width: number;
    readonly isCheckboxable: boolean;
    sortFn: any;
    sortClass: string;
    sortDir: SortDirection;
    selectFn: any;
    cellContext: any;
    headerContexInjector: Injector;
    private _column;
    private _sorts;
    constructor(cd: ChangeDetectorRef, injector: Injector);
    ngOnInit(): void;
    onContextmenu($event: MouseEvent): void;
    calcSortDir(sorts: any[]): any;
    onSort(): void;
    calcSortClass(sortDir: SortDirection): string;
}
