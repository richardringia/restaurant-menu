import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import React, { useState } from 'react';
import { CrudProps, CrudResponse } from './types';

export const useCrud = <T>({
    items,
    columns,
    singleTitle,
    form,
}: CrudProps<T>): CrudResponse<T> => {
    const [open, setOpen] = useState(false);

    const table = useReactTable({
        data: items,
        columns: columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return {
        table,
        open,
        setOpen,
        singleTitle,
        form: React.cloneElement(form, {
            afterSubmit: () => setOpen(false),
        }),
    };
};
