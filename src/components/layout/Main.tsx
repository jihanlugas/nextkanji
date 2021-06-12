import type { ReactNode } from "react";
import Header from "./Header";
import type { NextPage } from "next"

type Props = {

};

const Main: NextPage<Props> = ({ children }) => {
    return (
        <main className={"h-screen bg-gray-200"}>
            <Header />
            {children}
        </main>
    )
}

export default Main