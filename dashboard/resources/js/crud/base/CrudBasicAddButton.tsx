import { CrudBasicTableMutateDialog } from './CrudBasicTableDialog';

export const CrudBasicAddButton = ({
    title,
    trigger,
    form,
    open,
    setOpen,
}: {
    title: string;
    trigger: React.ReactNode;
    form: React.ReactNode;
    open: boolean;
    setOpen: (open: boolean) => void;
}) => {
    return (
        <div className="mb-4 flex justify-end">
            <CrudBasicTableMutateDialog
                title={title}
                object={null}
                trigger={trigger}
                open={open}
                setOpen={setOpen}
            >
                {form}
            </CrudBasicTableMutateDialog>
        </div>
    );
};
