import { ColumnDef, Table } from '@tanstack/react-table';
import { ReactElement } from 'react';

export interface CrudProps<T> {
    items: T[];
    columns: ColumnDef<T, any>[];
    singleTitle: string;
    form: ReactElement<CrudFormProps<T>>;
}

export interface CrudResponse<T> {
    table: Table<T>;
    open: boolean;
    setOpen: (open: boolean) => void;
    singleTitle: string;
    form: ReactElement<CrudFormProps<T>>;
}

export interface CrudFormProps<T> {
    object?: T;
    afterSubmit?: () => void;
}
