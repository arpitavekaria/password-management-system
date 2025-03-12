import React, {Suspense} from 'react';
import Credentials from "@/components/admin/credentials/Credentials";

const DataTable = () => {
    return (
        <div>
            <Suspense>
                <Credentials/>
            </Suspense>
        </div>
    );
};

export default DataTable;