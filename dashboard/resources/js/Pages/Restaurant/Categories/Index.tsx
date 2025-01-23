import { CrudBasic } from '@/crud/base/CrudBasic';
import { MenuCategory } from '@/crud/restaurant/categories/types';
import { useMenuCategoryCrud } from '@/crud/restaurant/categories/useMenuCategoryCrud';
import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';

export default function Index({ categories }: { categories: MenuCategory[] }) {
    const crud = useMenuCategoryCrud(categories);
    return (
        <DashboardLayout>
            <Head title="Menu categories" />
            <CrudBasic crud={crud} />
        </DashboardLayout>
    );
}
