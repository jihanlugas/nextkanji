import { createContext, useEffect } from "react";
import type { ReactNode } from "react";
import { useState } from "react";
import notifStyle from "../pages/styles/notif.module.scss";

const AppContext = createContext({
    notif: {
        success: (msg: string) => { },
        error: (msg: string) => { },
        info: (msg: string) => { },
        warning: (msg: string) => { },
    }
})

type Props = {
    children: ReactNode;
};

export const AppContextProvider = ({ children }: Props) => {
    const [showNotif, setShowNotif] = useState({
        show: false,
        title: "",
        msg: "",
        className: ""
    });

    const notif = {
        error: (msg: string) => {
            setShowNotif({
                show: true,
                title: "Error",
                msg: msg,
                className: "error"
            });
        },
        info: (msg: string) => {
            setShowNotif({
                show: true,
                title: "Info",
                msg: msg,
                className: "info"
            });
        },
        success: (msg: string) => {
            setShowNotif({
                show: true,
                title: "Success",
                msg: msg,
                className: "success"
            });
        },
        warning: (msg: string) => {
            setShowNotif({
                show: true,
                title: "Warning",
                msg: msg,
                className: "warning"
            });
        },
    }

    useEffect(() => {
        if (showNotif.show) {
            setTimeout(() => {
                setShowNotif({ ...showNotif, show: false });
            }, 3000)
        }
    }, [showNotif])

    const context = {
        notif,
    }

    return (
        <AppContext.Provider value={context}>
            <div className={showNotif.show === false ? [notifStyle.notif].join(" ") : [notifStyle.notif, notifStyle.active].join(" ")}>
                <div className={[notifStyle.notifContainer].join(" ")}>
                    <div className={[notifStyle.notifContent, notifStyle[showNotif.className]].join(" ")}>
                        <div className={[notifStyle.title].join(" ")}>{showNotif.title}</div>
                        <div className={[].join(" ")}>{showNotif.msg}</div>
                    </div>
                </div>
            </div>
            {children}
        </AppContext.Provider>
    )
}

export default AppContext