import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/Components/Dialog';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export const CrudBasicTableMutateDialog = ({
    title,
    object,
    trigger,
    children,
    open,
    setOpen,
}: {
    title: string;
    object: any;
    trigger: React.ReactNode;
    children: React.ReactNode;
    open?: boolean;
    setOpen?: (open: boolean) => void;
}) => {
    const isEditing = !!object;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEditing ? `Edit ${title}` : `Create ${title}`}
                    </DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    );
};

export const CrudBasicTableDeleteDialog = ({
    name,
    trigger,
    title,
    url,
}: {
    name: string;
    trigger: React.ReactNode;
    title: string;
    url: string;
}) => {
    const { delete: destroy, processing } = useForm();
    const [open, setOpen] = useState(false);

    const onDelete = () => {
        destroy(url, {
            onSuccess: () => setOpen(false),
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete {title}</DialogTitle>
                    <DialogDescription>
                        Are you sure you want to delete "{name}"? This action
                        cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-4">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        disabled={processing}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={onDelete}
                        disabled={processing}
                    >
                        Delete
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
