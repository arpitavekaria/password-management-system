import React, {Suspense} from 'react';
import Technology from "@/components/admin/technology/Technology";

const DataTable = () => {
    return (
        <div>
            <Suspense>
                <Technology/>
            </Suspense>
        </div>
    );
};

export default DataTable;