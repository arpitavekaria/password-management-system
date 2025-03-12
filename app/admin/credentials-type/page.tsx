import React, {Suspense} from 'react';
import CredentialsTypes from "@/components/admin/credential-type/CredentialsTypes";

const DataTable = () => {
    return (
        <div>
            <Suspense>
                <CredentialsTypes/>
            </Suspense>
        </div>
    );
};

export default DataTable;