import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { Textarea } from '@/Components/ui/textarea';
import { CrudFormProps } from '@/crud/base/types';
import { useForm } from '@inertiajs/react';
import { MenuCategory } from '../categories/types';
import { MenuItem } from './types';

export const MenuItemForm = ({
    object,
    afterSubmit,
    categories,
}: {
    categories: MenuCategory[];
} & CrudFormProps<MenuItem>) => {
    const isEditing = !!object;
    const { data, setData, post, patch, processing, errors } = useForm({
        name: object?.name ?? '',
        description: object?.description ?? '',
        price: object?.price ?? '',
        menu_category_id: object?.menu_category_id ?? '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            patch(`/items/${object.id}`, {
                onSuccess: () => {
                    afterSubmit?.();
                },
            });
        } else {
            post('/items', {
                onSuccess: () => {
                    afterSubmit?.();
                },
            });
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    id="name"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                    onValueChange={(value) =>
                        setData('menu_category_id', value)
                    }
                    defaultValue={object?.menu_category_id?.toString()}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem
                                key={category.id}
                                value={category.id.toString()}
                            >
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.menu_category_id && (
                    <p className="text-sm text-red-500">
                        {errors.menu_category_id}
                    </p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                    id="price"
                    type="number"
                    value={data.price}
                    onChange={(e) => setData('price', e.target.value)}
                />
                {errors.price && (
                    <p className="text-sm text-red-500">{errors.price}</p>
                )}
            </div>
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
                {errors.description && (
                    <p className="text-sm text-red-500">{errors.description}</p>
                )}
            </div>
            <Button type="submit" disabled={processing}>
                {isEditing ? 'Save Changes' : 'Create'}
            </Button>
        </form>
    );
};
