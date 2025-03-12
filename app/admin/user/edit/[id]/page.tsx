import React, {Suspense} from 'react';
import EditUser from "@/components/admin/user/EditUser";

const Page = async ({
                        params,
                    }: {
    params: Promise<{ id: string }>
}) => {
    const id = (await params).id
    return (
        <div>
            <Suspense>
                <EditUser id={id}/>
            </Suspense>
        </div>
    )
}

export default Page;