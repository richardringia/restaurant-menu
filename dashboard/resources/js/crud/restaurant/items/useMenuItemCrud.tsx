import { useCrud } from '@/crud/base/useCrud';
import { MenuCategory } from '../categories/types';
import { MenuItemsColumn } from './MenuItemColumns';
import { MenuItemForm } from './MenuItemForm';
import { MenuItem } from './types';

export const useMenuItemCrud = (
    items: MenuItem[],
    categories: MenuCategory[],
) => {
    return useCrud<MenuItem>({
        items,
        columns: MenuItemsColumn(categories),
        singleTitle: 'Menu item',
        form: <MenuItemForm categories={categories} />,
    });
};
