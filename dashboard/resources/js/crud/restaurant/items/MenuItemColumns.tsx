import { Button } from '@/components/ui/button';
import {
    CrudBasicTableDeleteDialog,
    CrudBasicTableMutateDialog,
} from '@/crud/base/CrudBasicTableDialog';
import { createColumnHelper } from '@tanstack/react-table';
import { MenuCategory } from '../categories/types';
import { MenuItemForm } from './MenuItemForm';
import { MenuItem } from './types';

const columnHelper = createColumnHelper<MenuItem>();

export const MenuItemsColumn = (categories: MenuCategory[]) => {
    return [
        columnHelper.accessor('name', {
            header: 'Name',
            cell: (info) => info.getValue(),
        }),
        columnHelper.accessor('menu_category_id', {
            header: 'Category',
            cell: (info) =>
                categories.find((category) => category.id === info.getValue())
                    ?.name,
        }),
        columnHelper.accessor('price', {
            header: 'Price',
            cell: (info) => info.renderValue(),
        }),
        columnHelper.accessor((row) => row, {
            id: 'actions',
            header: 'Actions',
            cell: (info) => (
                <div className="flex gap-2">
                    <CrudBasicTableMutateDialog
                        title="Menu item"
                        object={info.getValue()}
                        trigger={
                            <Button variant="outline" size="sm">
                                Edit
                            </Button>
                        }
                    >
                        <MenuItemForm
                            categories={categories}
                            object={info.getValue()}
                        />
                    </CrudBasicTableMutateDialog>

                    <CrudBasicTableDeleteDialog
                        name={info.getValue().name}
                        url={`/items/${info.getValue().id}`}
                        trigger={
                            <Button variant="destructive" size="sm">
                                Delete
                            </Button>
                        }
                        title="Menu item"
                    />
                </div>
            ),
        }),
    ];
};
