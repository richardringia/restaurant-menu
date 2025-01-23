import { CrudBasicTableDeleteDialog } from '@/crud/base/CrudBasicTableDialog';

import { Button } from '@/components/ui/button';
import { CrudBasicTableMutateDialog } from '@/crud/base/CrudBasicTableDialog';
import { createColumnHelper } from '@tanstack/react-table';
import { MenuCategoryForm } from './MenuCategoryForm';
import { MenuCategory } from './types';

const columnHelper = createColumnHelper<MenuCategory>();

export const MenuCategoryColumns = () => [
    columnHelper.accessor('name', {
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor('created_at', {
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor('updated_at', {
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor((row) => row, {
        id: 'actions',
        header: 'Actions',
        cell: (info) => (
            <div className="flex gap-2">
                <CrudBasicTableMutateDialog
                    title="Menu category"
                    object={info.getValue()}
                    trigger={
                        <Button variant="outline" size="sm">
                            Edit
                        </Button>
                    }
                >
                    <MenuCategoryForm object={info.getValue()} />
                </CrudBasicTableMutateDialog>
                <CrudBasicTableDeleteDialog
                    name={info.getValue().name}
                    title="Category"
                    url={`/categories/${info.getValue().id}`}
                    trigger={
                        <Button variant="destructive" size="sm">
                            Delete
                        </Button>
                    }
                />
            </div>
        ),
    }),
];
