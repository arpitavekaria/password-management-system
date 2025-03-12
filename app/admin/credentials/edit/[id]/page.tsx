import React, {Suspense} from 'react';
import EditCredentials from "@/components/admin/credentials/EditCredentials";

const Page = async ({
                        params,
                    }: {
    params: Promise<{ id: string }>
}) => {
    const id = (await params).id
    return (
        <div>
            <Suspense>
                <EditCredentials id={id}/>
            </Suspense>
        </div>
    )
}

export default Page;