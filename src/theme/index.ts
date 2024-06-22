import {MantineThemeOverride} from "@mantine/core";

const Theme: MantineThemeOverride = {
    /** Put your mantine theme override here */
    colorScheme: 'dark',
    colors: {
        "dark": [
            "#C1C2C5", "#A6A7AB", "#909296", "#5C5F66", "#373A40", "#2C2E33", "#292d31", "#2e3139", "#141517", "#1b1c1f"
        ],
        "yellow": [
            "#FFFDE7",
            "#FFF9C4",
            "#FFF59D",
            "#FFF176",
            "#FFEE58",
            "#FFEB3B",
            "#f6d536",
            "#FBC02D",
            "#F9A825",
            "#FFF8E1",
        ],
        "cyan": [
            "#E5FFFF",
            "#B8FFFF",
            "#8AFFFF",
            "#5CFFFF",
            "#2EFFFF",
            "#00FFFF",
            "#00CCCC",
            "#009999",
            "#006666",
            "#003333",
        ],
        "green": [
            "#E9FEE7",
            "#C1FBBB",
            "#9AF990",
            "#72F664",
            "#4BF439",
            "#23F20D",
            "#1CC10B",
            "#159108",
            "#0E6105",
            "#073003"
        ],
        "red": [
            "#FFE7E5",
            "#FFBCB8",
            "#FF928A",
            "#FF675C",
            "#ff3324",
            "#FF1100",
            "#CC0E00",
            "#990A00",
            "#660700",
            "#330300"
        ],
        "opw": [
            "rgba(255,255,255,0.05)",
            "rgba(255,255,255,0.1)",
            "rgba(255,255,255,0.2)",
            "rgba(255,255,255,0.6)"
        ],
        "pink": [
            "#FAEAF2",
            "#F2C4DC",
            "#EA9FC5",
            "#E279AE",
            "#D95397",
            "#D12E81",
            "#AC3068",
            "#7E1B4D",
            "#541233",
            "#2A091A"
        ]
    },
    white: "#FFF",
    black: "#000",
    primaryColor: "yellow",
    primaryShade: 6,
    defaultRadius: "md",
    breakpoints: {
        xs: '16em',
        sm: '30em',
        md: '48em',
        lg: '64em',
        xl: '74em',
    },
    globalStyles: (theme) => ({
        '*, *::before, *::after': {
            boxSizing: 'border-box',
        },
        body: {
            ...theme.fn.fontStyles(),
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.white,
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    }),
    components: {
        Input: {
            styles: (theme) => ({
                input: {
                    backgroundColor: theme.colors.dark[6]
                }
            })
        }
    }
}

export default Theme;
