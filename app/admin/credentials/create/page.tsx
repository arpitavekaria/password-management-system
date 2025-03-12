import React, {Suspense} from 'react';
import AddCredentials from "@/components/admin/credentials/AddCredentials";

const DataTable = () => {
    return (
        <div>
            <Suspense>
                <AddCredentials/>
            </Suspense>
        </div>
    );
};

export default DataTable;