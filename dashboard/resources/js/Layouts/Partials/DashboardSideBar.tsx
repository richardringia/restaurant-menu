import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/Components/ui/sidebar';
import { usePage } from '@inertiajs/react';
import { Command, Settings2, SquareTerminal } from 'lucide-react';
import { DashboardMainNav } from './DashboardMainNav';
import { DashboardUserNav } from './DashboardUserNav';

export function DashboardSideBar({
    ...props
}: React.ComponentProps<typeof Sidebar>) {
    const data = {
        navMain: [
            {
                title: 'Orders',
                url: '#',
                icon: SquareTerminal,
                isActive: true,
                items: [
                    {
                        title: 'Dashboard',
                        url: '/dashboard',
                    },
                    {
                        title: 'Active',
                        url: '#',
                    },
                    {
                        title: 'Completed',
                        url: '#',
                    },
                ],
            },
            {
                title: 'Menu',
                url: '#',
                icon: SquareTerminal,
                isActive: true,
                items: [
                    {
                        title: 'Items',
                        url: '/items',
                    },
                    {
                        title: 'Categories',
                        url: '/categories',
                    },
                ],
            },
            {
                title: 'Settings',
                url: '#',
                icon: Settings2,
                items: [
                    {
                        title: 'Restaurant',
                        url: '#',
                    },
                ],
            },
        ],
    };

    const {
        props: { restaurant },
    } = usePage();

    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    <Command className="size-4" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {restaurant.name}
                                    </span>
                                    <span className="truncate text-xs">
                                        Restaurant
                                    </span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <DashboardMainNav items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <DashboardUserNav />
            </SidebarFooter>
        </Sidebar>
    );
}
