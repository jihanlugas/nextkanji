import { useState, useEffect } from "react"
import Main from "../../components/layout/Main"
import Head from "next/head"

const Kanji = () => {
    return (
        <Main>
            <Head>
                <title>Kanji</title>
            </Head>
            <div className={"p-4"}>
                <div className={"mb-4"}>
                    <div className={"text-2xl"}>Kanji</div>
                </div>
                <div className={""}>

                </div>
            </div>
        </Main>
    )
}

export default Kanji;