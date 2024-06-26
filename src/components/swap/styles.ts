import { createStyles } from "@mantine/core";

export const useInputBoxStyles = createStyles((theme) => ({
    root: {
    },
    boxRoot: {
        padding: "0",
        background: "#35393d",
        borderRadius: "12px"
    },
    addressBar: {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: "12px 16px",
        // [theme.fn.largerThan("md")]: {
        //     flexDirection: "row",
        //     alignItems: "center",
        // }
    },
    addressLabel: {
        width: "100%",
        // [theme.fn.largerThan("md")]: {
        //     width: "160px"
        // }
    },
    addressText: {
        width: "100%",
        overflow: "hidden",
        display: "flex",
        marginTop: '12px',
        alignItems: "center",
        justifyContent: "flex-end",
        cursor:'pointer'
    },
    addressInput: {
        flexGrow: 1,
        maxWidth: "calc(100% - 30px)",
        // textOverflow: "ellipsis",
        // overflow: "hidden",
        input: {
            padding: 0,
            background: "transparent",
            lineHeight: 1,
            minHeight: "10px"
        }
    },
    valueBox: {
        padding: "12px 16px",
    },
    insufficient: {
        padding: 10,
        borderRadius: "8px",
        border: "solid 1px #ee4225",
        backgroundImage: "linear-gradient(to bottom, rgba(238, 66, 37, 0), rgba(238, 66, 37, 0.25))",
    }
}))

export const useMainCardStyles = createStyles((theme) => ({
    root: {
        background: "transparent",
        width: "84vw",
        position: "relative",
        [theme.fn.largerThan("md")]: {
            width: "440px",
        }
    },
    toolBar: {
    },
    history: {
        backgroundColor: '#292D31',
        borderRadius: '4px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize:'12px',
        gap:'4px',
        padding: '2px 8px',
        cursor:'pointer'
    },
    panel: {
        width: "100%",
        backgroundColor: theme.colors.dark[6],
        borderRadius: "12px",
        padding: "10px",
        position: "relative",
    },
    revertButton: {
        margin: "0 -10px"
    }
}));
export const useChainLogoStyles = createStyles((theme, { empty }: { empty: boolean }) => ({
    root: {
        width: "32px",
        height: "32px",
        position: "relative",
    },
    chainImg: {
        width: "100%",
        height: "100%",
        backgroundColor: empty ? "rgba(255,255,255,0.1)" : "transparent",
        borderRadius: "32px",
    },
    tokenImg: {
        width: "12px",
        height: "12px",
        position: "absolute",
        bottom: 0,
        right: "-2px",
        backgroundColor: empty ? "rgba(255,255,255,0.1)" : "transparent",
        border: empty ? "1px solid white" : "none",
        borderRadius: "12px",
    }
}))


export const useChainBoxStyles = createStyles((theme) => ({
    root: {
        // minWidth:"90px",
        // flexGrow: 1,
        borderRadius: "16px",
        position: "relative",
    },
    content: {
        background: "#35393d",
        borderRadius: "16px",
        width: "100%",
        cursor: "pointer",
        paddingRight:"10px",
        // padding: "10px 12px",
        // [theme.fn.largerThan("md")]: {
        //     padding: "10px 20px",
        // },
        ["&:hover"]: {
            opacity: '0.7'
        }
    },
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        cursor: "not-allowed",
        background: "#35393D",
        opacity: "0.8",
        borderRadius: '16px',
    }
}))


export const useMainCardModalBox = createStyles((theme, { show }: { show: boolean }) => ({
    root: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        overflow: "hidden",
        borderRadius: "10px",
        visibility: show ? "visible" : "hidden",
        zIndex: 1,
    },
    content: {
        width: "100%",
        height: "100%",
        position: "relative",
    },
    overlay: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.6)",
        opacity: show ? 1 : 0,
        transition: "opacity 0.3s linear",
    },
    modalsContent: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
    }
}))
export const useSettingPanelStyles = createStyles((theme, { show }: { show: boolean }) => ({
    root: {
        width: "100%",
        borderRadius: "12px",
        padding: "15px 12px",
        position: "absolute",
        top: 0,
        left: 0,
        transform: show ? "translate(0, 0)" : "translate(0, -100%)",
        transition: "all 0.3s var(--var-main-cubic)",
    }
}))

export const useAddressInputPanelStyle = createStyles((theme, { show }: { show: boolean }) => ({
    root: {
        width: `calc(100% - 32px)`,
        borderRadius: "12px",
        padding: "15px 12px",
        position: "absolute",
        top: "126px",
        left: "16px",
        transform: show ? "translate(0, 0)" : "translate(0, -200%)",
        transition: "all 0.3s var(--var-main-cubic)"
    }
}))
