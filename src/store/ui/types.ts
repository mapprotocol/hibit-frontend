import {Swiper} from "swiper/types";
import {EmblaCarouselType} from "embla-carousel";
export enum Cards {
    History = 'history',
    BestRoute = 'bestRoute',
    MoreRoute = 'moreRoute',
    MainCard = 'mainCard',
}

export interface UIState {
    pages: Cards[],
    swiper?: Swiper,
    embApi?: EmblaCarouselType | null,
    showBestCard: boolean,
    showMoreCard: boolean,
    showHistoryCard: boolean,

    activeIndex: number,
}
