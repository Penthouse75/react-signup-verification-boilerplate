import React from 'react';
import Tree from '../tree/Tree'
import { accountService } from '@/_services';

import FileUpload from "../components/FilesUpload"

function Home() {
    const user = accountService.userValue;

    return (
        <>
        <div className="p-4">
            <div className="container">

            <h1>Здравствуйте, {user.firstName}!</h1>
                
                    <FileUpload />
                </div>
        </div>
        
        </>
    );
}

export { Home };