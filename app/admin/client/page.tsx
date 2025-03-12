import React, {Suspense} from 'react';
import Client from "@/components/admin/client/Client";

const DataTable = () => {
    return (
        <div>
            <Suspense>
                <Client/>
            </Suspense>
        </div>
    );
};

export default DataTable;