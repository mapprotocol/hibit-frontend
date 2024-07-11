import localFont from "next/font/local";

const supercellFont = localFont({
    src: [
        {
            path: "../../public/fonts/supercell/Supercell-Magic-Regular.ttf",
            weight: "400",
            style: "normal"
        },
    ]
})

export default supercellFont;
