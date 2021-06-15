import type { ReactNode } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useState } from "react";


type Props = {

};

const Main: NextPage<Props> = ({ children }) => {

    const [show, setShow] = useState(false);

    const onClickOverlay = () => {
        setShow(!show)
    }

    return (
        <main className={"h-screen"}>
            {/* <Head>
                <link href="https://fonts.googleapis.com/css?family=Noto+Serif+JP:400,700" rel="stylesheet" />
            </Head> */}
            <Sidebar onClickOverlay={onClickOverlay} show={show} />
            <Header onClickOverlay={onClickOverlay} />
            {children}
        </main>
    )
}

export default Main