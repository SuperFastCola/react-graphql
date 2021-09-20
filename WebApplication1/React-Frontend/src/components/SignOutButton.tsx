import React from "react";
import { useMsal } from "@azure/msal-react";

function handleLogout(instance:any) {
    instance.logoutRedirect().catch((e:any) => {
        console.error(e);
    });
}

export const SignOutButton = () => {
    const { instance } = useMsal();

    return (
        <button className="secondary ml-auto" onClick={() => handleLogout(instance)}>Sign out using Redirect</button>
    );
}