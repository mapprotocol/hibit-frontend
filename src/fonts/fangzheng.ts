import localFont from "next/font/local";

const fangzhengFont = localFont({
    src: [
        {
            path: "../../public/fonts/fangzheng/fangzheng.ttf",
            weight: "700",
            style: "normal"
        },
    ]
})

export default fangzhengFont;
