import { createStyles } from "@mantine/core";

export const useTokenSelectorModalStyles = createStyles((theme) => ({
    content: {
        background: theme.colors.dark[6],
    },
    header: {
        background: theme.colors.dark[6],
    },
    body: {
      padding: 0,
    },
    title: {
        color: theme.colors.yellow[0],
        fontWeight: 700,
    },
    close: {
        borderRadius: "50%",
        border: "1px solid white"
    }
}));

export const useTokenSelectorStyles = createStyles((theme, { show, viewportWidth }: { show: boolean, viewportWidth: number }) => ({
    root: {
        padding: 0,
        background: theme.colors.dark[6],
        borderRadius: "12px",
        top: 0,
        left: 0,
        zIndex: 1000,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        [theme.fn.largerThan("md")]: {
            width: "100%",
        }
    },
    titleBar: {
        padding: "10px 15px 10px 15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
    },
    chainBox: {
        padding: "14px 0 0 0",
        borderBottom: "1px solid rgba(255,255,255,0.1)"
    },
    inputBox: {
        padding: "0 15px",
    },
    chainList: {
        padding: "0 15px 14px 15px",
        ["::-webkit-scrollbar"]: {
            width: "5px",
        },
        ["::-webkit-scrollbar-track"]: {
            background: "#292d31"
        },
        ["::-webkit-scrollbar-thumb"]: {
            background: "#4D4D4D",
            borderRadius: "10px",
        },
        ["::-webkit-scrollbar-thumb:hover"]: {
            background: "#4D4D4D",
        },
        overflow: "auto",
        maxHeight: "200px",
        ["@media (max-width: 768px)"]: {
            height: "30vh",
        }
    },
    tokenListBox: {
        overflow: "auto",
        height: "300px",
        ["@media (max-width: 768px)"]: {
            height: "calc(70vh - 130px)",
        },
        [".mantine-List-itemWrapper"]: {
            width: "100%"
        },
        ["::-webkit-scrollbar"]: {
            width: "5px",
        },
        ["::-webkit-scrollbar-track"]: {
            background: "#292d31"
        },
        ["::-webkit-scrollbar-thumb"]: {
            background: "#4D4D4D",
            borderRadius: "10px",
        },
        ["::-webkit-scrollbar-thumb:hover"]: {
            background: "#4D4D4D"
        }
    },
    tokenItem: {
        cursor: "pointer",
        padding: "8px 16px",
        // ["&:hover"]: {
        //     background: "rgba(255,255,255,0.05)",
        // },
        ['&.selected']: {
            background: "rgba(255,255,255,0.1)",
        }
    }
}))
