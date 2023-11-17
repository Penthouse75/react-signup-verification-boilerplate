import React from 'react';
import { accountService } from '@/_services';

import FileUpload from "../components/FilesUpload"
import TableDemo from "./table/TableDemo"

function Home() {
    const user = accountService.userValue;

    return (
        <>
            <div className="p-4">
                <div className="container">

                    <h1>Здравствуйте, {user.firstName}!</h1>
                    <FileUpload />
                    <div className="row my-12">
                        <TableDemo />
                    </div>

                </div>
            </div>

        </>
    );
}

export { Home };