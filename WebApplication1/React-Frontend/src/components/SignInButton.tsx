import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

function handleLogin(instance:any) {
    instance.loginRedirect(loginRequest).catch( (e:any) => {
        console.error(e);
    });
}

export const SignInButton = () => {
    const { instance } = useMsal();

    return (
        <>
        <button className="secondary ml-auto" onClick={() => handleLogin(instance)}>Sign in using Redirect</button>
        </>
    );
}