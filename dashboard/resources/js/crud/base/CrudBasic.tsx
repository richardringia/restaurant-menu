import { Button } from '@/components/ui/button';
import { CrudBasicAddButton } from './CrudBasicAddButton';
import { CrudBasicTable } from './CrudBasicTable';
import { CrudResponse } from './types';

export const CrudBasic = ({ crud }: { crud: CrudResponse<any> }) => {
    return (
        <>
            <CrudBasicAddButton
                title={crud.singleTitle}
                trigger={<Button>Create {crud.singleTitle}</Button>}
                form={crud.form}
                open={crud.open}
                setOpen={crud.setOpen}
            />
            <CrudBasicTable table={crud.table} />
        </>
    );
};
