import { useCrud } from '@/crud/base/useCrud';
import { MenuCategoryColumns } from './MenuCategoryColumns';
import { MenuCategoryForm } from './MenuCategoryForm';
import { MenuCategory } from './types';

export const useMenuCategoryCrud = (items: MenuCategory[]) => {
    return useCrud<MenuCategory>({
        columns: MenuCategoryColumns(),
        items,
        singleTitle: 'Category',
        form: <MenuCategoryForm />,
    });
};
