import { Fragment, useContext, useEffect } from "react"
import AppContext from "../../stores/appContext"
import useAuth from "../../lib/useAuth"
import type { NextPage } from "next"

type Props = {

};


const Header: NextPage<Props> = ({ children }) => {
    const { notif } = useContext(AppContext)

    return (
        <header>
            <div className={"bg-green-500 h-16 flex items-center px-4 shadow-lg"}>
                <div>{process.env.APP_NAME}</div>
                {/* <div className={"hidden sm:flex ml-auto"}>
                    <div className={"ml-4"}>About</div>
                    {auth ? (
                        <Fragment>
                            <div className={"ml-4"}>{auth.email}</div>
                            <div className={"ml-4"}>Logout</div>
                        </Fragment>
                    ) : (
                        <div className={"ml-4"}>Login/Signup</div>
                    )}
                </div> */}
            </div>
        </header>
    )
}

export default Header