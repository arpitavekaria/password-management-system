import React, {Suspense} from 'react';
import DashboardUi from "@/components/dashboard/Dashboard";

const Dashboard = () => {
    return (
        <>
            <Suspense>
                <DashboardUi/>
            </Suspense>
        </>
    );
};

export default Dashboard;