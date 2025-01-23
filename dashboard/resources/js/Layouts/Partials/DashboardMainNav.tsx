import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/Components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/Components/ui/sidebar';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { ChevronRight, type LucideIcon } from 'lucide-react';

export function DashboardMainNav({
    items,
}: {
    items: {
        title: string;
        url: string;
        icon: LucideIcon;
        isActive?: boolean;
        items?: {
            title: string;
            url: string;
        }[];
    }[];
}) {
    const { url: currentUrl } = usePage();

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Restaurant</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isActive =
                        currentUrl.startsWith(item.url) ||
                        item.items?.some((subItem) =>
                            currentUrl.startsWith(subItem.url),
                        );

                    return (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={isActive}
                        >
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild tooltip={item.title}>
                                    <a
                                        href={item.url}
                                        className={cn(
                                            'flex items-center gap-x-2 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span>{item.title}</span>
                                    </a>
                                </SidebarMenuButton>
                                {item.items?.length ? (
                                    <>
                                        <CollapsibleTrigger asChild>
                                            <SidebarMenuAction className="data-[state=open]:rotate-90">
                                                <ChevronRight className="h-4 w-4" />
                                                <span className="sr-only">
                                                    Toggle
                                                </span>
                                            </SidebarMenuAction>
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items?.map((subItem) => {
                                                    const isSubItemActive =
                                                        currentUrl.startsWith(
                                                            subItem.url,
                                                        );
                                                    return (
                                                        <SidebarMenuSubItem
                                                            key={subItem.title}
                                                        >
                                                            <SidebarMenuSubButton
                                                                asChild
                                                            >
                                                                <a
                                                                    href={
                                                                        subItem.url
                                                                    }
                                                                    className={cn(
                                                                        'block rounded-md px-3 py-2 text-sm font-medium transition-colors',
                                                                        isSubItemActive
                                                                            ? 'bg-accent text-accent-foreground'
                                                                            : 'hover:bg-accent/50 hover:text-accent-foreground',
                                                                    )}
                                                                >
                                                                    <span>
                                                                        {
                                                                            subItem.title
                                                                        }
                                                                    </span>
                                                                </a>
                                                            </SidebarMenuSubButton>
                                                        </SidebarMenuSubItem>
                                                    );
                                                })}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </>
                                ) : null}
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
