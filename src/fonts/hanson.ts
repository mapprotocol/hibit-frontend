import localFont from "next/font/local";

const hansonFont = localFont({
    src: [
        {
            path: "../../public/fonts/hanson/Hanson-Bold-700.otf",
            weight: "700",
            style: "normal"
        },
    ]
})

export default hansonFont;
