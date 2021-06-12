import Main from "../components/layout/Main"
import Head from "next/head"

export default function Home() {
    return (
        <Main>
            <Head>
                <title>Home</title>
            </Head>
            <div className={"p-4"}>Home</div>
        </Main>
    )
}
