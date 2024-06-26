import {createStyles, getStylesRef} from "@mantine/core";
import {PropsWithChildren} from "react";

type MagicButtonStyleProps = {
    width: number | string,
    height: number | string,
    justifyContent: string,
    radius: string | number,
    selected: boolean,
}

const useStyles = createStyles((theme, {width, height, justifyContent, radius, selected}: MagicButtonStyleProps) => ({
    btn: {
        outline: "none",
        border: "none",
        boxShadow: "none",
        background: "transparent",
        // [`&:hover .${getStylesRef("btnFill")}`]: {
        //     transform: "translateY(0%) scale(0.98) rotate(0.001deg)",
        // },
        // [`&:hover .${getStylesRef('btnContent')}`]: {
        //     transform: "translateY(-10%) scale(0.96) rotate(0.001deg)",
        //     opacity: ".5",
        // },
        // [`&:hover .${getStylesRef('btnDuplicateFill')}`]: {
        //     transform: "translateY(0%) scale(1) rotate(0.001deg)",
        // },
        // [`&:hover .${getStylesRef('btnDuplicateContent')}`]: {
        //     transform: "translateY(0%) scale(1) rotate(0.001deg)",
        //     opacity: 1,
        // },
        [`&:focus .${getStylesRef("btnFill")}`]: {
            transform: "translateY(0%) scale(0.98) rotate(0.001deg)",
        },
        [`&:focus .${getStylesRef('btnContent')}`]: {
            transform: "translateY(-10%) scale(0.96) rotate(0.001deg)",
            opacity: ".5",
        },
        [`&:focus .${getStylesRef('btnDuplicateFill')}`]: {
            transform: "translateY(0%) scale(1) rotate(0.001deg)",
        },
        [`&:focus .${getStylesRef('btnDuplicateContent')}`]: {
            transform: "translateY(0%) scale(1) rotate(0.001deg)",
            opacity: 1,
        }
    },
    btnClick: {
        ref: getStylesRef("btnClick"),
        cursor: "pointer",
        border: 0,
        background: "transparent",
        borderRadius: radius || "2em",
        minWidth: "1em",
        height: height,
        width: width || "unset",
        padding: 0,
        fontSize: "1em",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent,
        position: "relative",
        textDecoration: "none",
        willChange: "transform",
        outline: 0,
        transform: "translateZ(0) rotate(0.001deg)",
        paddingRight: "10px",
    },
    btnFill: {
        ref: getStylesRef('btnFill'),
        border: "solid 1px #33363a",
        borderRadius: radius || "2em",
        position: "absolute",
        width: "100%",
        height: "100%",
        transform: selected ? "translateY(0%) scale(0.98) rotate(0.001deg)" :  "translateY(0%) scale(1) rotate(0.001deg)",
        transition: "0.4s cubic-bezier(0.5, 0.75, 0, 1), border 0.2s ease-in-out, background-color 0.2s ease-in-out",
    },
    btnContent: {
        ref: getStylesRef('btnContent'),
        border: "none",
        position: "relative",
        opacity: selected ? ".5" : 1,
        transform: selected ? "translateY(-10%) scale(0.96) rotate(0.001deg)" : "translateY(0%) scale(1) rotate(0.001deg)",
        transition: "all 0.4s cubic-bezier(0.5, 0.75, 0, 1)",
    },
    btnDuplicateFill: {
        ref: getStylesRef("btnDuplicateFill"),
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        transform: selected ? "translateY(0%) scale(1) rotate(0.001deg)" : "translateY(100%) scale(0.96) rotate(0.001deg)",
        transition: "0.4s cubic-bezier(0.5, 0.75, 0, 1), border 0.2s ease-in-out, background-color 0.2s ease-in-out",
        background: "#444444",
    },
    btnDuplicateContent: {
        ref: getStylesRef("btnDuplicateContent"),
        position: "absolute",
        top: 0,
        width: "100%",
        height: "100%",
        left: 0,
        opacity: selected ? 1 : 0,
        transform: selected ? "translateY(0%) scale(1) rotate(0.001deg)" : "translateY(100%) scale(0.9) rotate(0.001deg)",
        transition: "all 0.4s cubic-bezier(0.5, 0.75, 0, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent,
    }
}))

type MagicButtonProps = {
    width: number | string,
    height: number | string,
    justifyContent: string,
    radius: string | number,
    onClick: () => void,
    selected: boolean,
}

const MagicButton = ({children, width, height, justifyContent, radius, onClick, selected}: PropsWithChildren<MagicButtonProps>) => {
    const {classes} = useStyles({width, height, justifyContent, radius, selected});
    return (
        <button className={classes.btn} onClick={onClick}>
            <div className={classes.btnClick}>
                <div className={classes.btnFill}></div>
                <div className={classes.btnContent}>
                    {children}
                </div>
                <div className={classes.btnDuplicateFill}></div>
                <div className={classes.btnDuplicateContent}>
                    {children}
                </div>
            </div>
        </button>
    )
}

export default MagicButton;
