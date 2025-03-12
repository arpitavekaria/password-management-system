import React, {Suspense} from 'react';
import User from "@/components/admin/user/User";

const DataTable = () => {
    return (
        <div>
            <Suspense>
                <User/>
            </Suspense>
        </div>
    );
};

export default DataTable;