import { Fragment, useContext, useEffect } from "react"
import AppContext from "../../stores/appContext"
import useAuth from "../../lib/useAuth"
import type { NextPage } from "next"
import { GoThreeBars } from 'react-icons/go'

type Props = {
    onClickOverlay: Function,
};


const Header: NextPage<Props> = ({ children, onClickOverlay }) => {
    const { notif } = useContext(AppContext)

    const handleClick = () => {

    }

    return (
        <header>
            <div className={"bg-green-500 h-16 flex items-center px-4 shadow-lg"}>
                <div className="-ml-2 flex justify-center items-center h-12 w-12 cursor-pointer" onClick={() => onClickOverlay()}>
                    <div className="flex justify-center items-center h-8 w-8 ">
                        <GoThreeBars size={"2em"} />
                    </div>
                </div>
                <div className={"text-2xl "}>{process.env.APP_NAME}</div>

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