import { CrudBasic } from '@/crud/base/CrudBasic';
import { MenuCategory } from '@/crud/restaurant/categories/types';
import { MenuItem } from '@/crud/restaurant/items/types';
import { useMenuItemCrud } from '@/crud/restaurant/items/useMenuItemCrud';

import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Index({
    items,
    categories,
}: {
    items: MenuItem[];
    categories: MenuCategory[];
}) {
    const crud = useMenuItemCrud(items, categories);
    return (
        <DashboardLayout>
            <Head title="Menu items" />
            <CrudBasic crud={crud} />
        </DashboardLayout>
    );
}
