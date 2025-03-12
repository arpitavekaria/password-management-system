import React, {Suspense} from 'react';
import Sales from "@/components/sales/Sales";

const SalesPage = () => {
    return (
        <>
            <Suspense>
                <Sales />
            </Suspense>
            </>
    );
};

export default SalesPage;