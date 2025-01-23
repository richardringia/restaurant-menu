import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CrudFormProps } from '@/crud/base/types';
import { useForm } from '@inertiajs/react';
import { MenuCategory } from './types';

export const MenuCategoryForm = ({
    object,
    afterSubmit,
}: {} & CrudFormProps<MenuCategory>) => {
    const isEditing = !!object;
    const { data, setData, post, patch, processing, errors } = useForm({
        name: object?.name ?? '',
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            patch(`/categories/${object.id}`, {
                onSuccess: () => afterSubmit?.(),
            });
        } else {
            post('/categories', {
                onSuccess: () => {
                    afterSubmit?.();
                    setData({ name: '' });
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
            <Button type="submit" disabled={processing}>
                {isEditing ? 'Save Changes' : 'Create'}
            </Button>
        </form>
    );
};
