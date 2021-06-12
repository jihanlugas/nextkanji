import type { ReactNode } from "react";
import Main from "./Main";
import type { NextPage } from "next";
import useAuth from "../../lib/useAuth";
import router from "next/router";

type Props = {

};

const Auth: NextPage<Props> = ({ children }) => {
    const { auth, isLoading, error } = useAuth();

    if (auth) {
        return (
            <Main>
                {children}
            </Main>
        )
    } else if (isLoading) {
        return (
            <Main>
                <div>Loading ...</div>
            </Main>
        )
    } else {
        router.push("/sign-in")
        return null
    }

    // return (
    //     <Main>
    //         {false ? (
    //             <div>
    //                 {children}
    //             </div>
    //         ) : true ? (
    //             <div className={"h-screen"}>
    //                 <div>Loading ...</div>
    //             </div>
    //         ) : (
    //             <div className={"p-4"}>
    //                 <div>No Auth ...</div>
    //             </div>
    //         )}
    //     </Main>
    // )
}

export default Auth