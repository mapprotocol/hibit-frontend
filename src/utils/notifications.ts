import {notifications} from "@mantine/notifications";


const DURDING_TIME = 5000


export const showError = (msg: string) => {
    notifications.show({
        message: msg,
        color: "red",
        autoClose: DURDING_TIME,
        withCloseButton: true,
    })
}
    
export const showSuccess = (msg: string) => {
    notifications.show({
        message: msg,
        color: "green",
        autoClose: DURDING_TIME,
        withCloseButton: true,
    })
}

export const showTip = (msg: string,title = '') => {
    notifications.show({
        title,
        message: msg,
        color: "orange",
        autoClose: DURDING_TIME,
        withCloseButton: true,
    })
}
    