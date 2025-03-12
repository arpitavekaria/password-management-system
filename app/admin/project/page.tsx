import React, {Suspense} from 'react';
import Project from "@/components/admin/project/Project";

const DataTable = () => {
    return (
        <div>
            <Suspense>
                <Project/>
            </Suspense>
        </div>
    );
};

export default DataTable;