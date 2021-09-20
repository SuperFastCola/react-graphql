import React from "react";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignInButton } from "../components/SignInButton";
import { SignOutButton } from "../components/SignOutButton";
import {ProfileContent} from "../components/ProfileContent";

/**
 * Renders the navbar component with a sign-in button if a user is not authenticated
 */
export const PageLayout = (props:any) => {
    const isAuthenticated = useIsAuthenticated();

    return (
        <>
            { isAuthenticated ? <SignOutButton /> : <SignInButton /> }
            <ProfileContent/>
            <h5>Welcome to the Microsoft Authentication Library For React Tutorial</h5>
            {props.children}
        </>
    );
};