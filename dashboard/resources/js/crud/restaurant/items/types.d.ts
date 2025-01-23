export interface MenuItem {
    id: number;
    name: string;
    description: string | null;
    price: number;
    menu_category_id: number;
    menu_category: {
        id: number;
        name: string;
    };
    created_at: string;
    updated_at: string;
}
