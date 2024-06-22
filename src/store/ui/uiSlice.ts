import {Cards, UIState} from "@/store/ui/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AnimationBackEase} from "@/utils/animations";

const initialState: UIState = {
    pages: [Cards.MainCard],
    swiper: undefined,
    showBestCard: false,
    showMoreCard: false,
    showHistoryCard: false,

    activeIndex: 0,
}

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setActiveIndex: (state, action) => {
            state.activeIndex = action.payload;
        },
        insertCard: (state, action: PayloadAction<Cards>) => {
            state.pages.push(action.payload);
        },
        removeCard: (state, action: PayloadAction<Cards>) => {
            const index = state.pages.indexOf(action.payload);
            if (index >= 0) {
                state.pages.splice(index, 1);
            }
        },
        setSwiper: (state, action) => {
            state.swiper = action.payload;
        },
        toggleHistoryShow: (state, action) => {
            state.showHistoryCard = action.payload;
        },
        toggleBestShow: (state, action) => {
            state.showBestCard = action.payload;
        },
        toggleMoreShow: (state, action) => {
            state.showMoreCard = action.payload;
        },
        setEmbAbi: (state,action) => {
            state.embApi = action.payload;
        }
    }
});

export const {
    setSwiper,
    toggleHistoryShow,
    setActiveIndex,
    toggleMoreShow,
    toggleBestShow,
    setEmbAbi,
} = uiSlice.actions;

