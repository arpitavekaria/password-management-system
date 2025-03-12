import React, {Suspense} from 'react';
import AddUser from "@/components/admin/user/AddUser";

const DataTable = () => {
    return (
        <div>
            <Suspense>
                <AddUser/>
            </Suspense>
        </div>
    );
};

export default DataTable;