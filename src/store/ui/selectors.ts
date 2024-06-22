import {memoize} from "proxy-memoize";
import {RootState} from "@/store";
import {selectBestRoute, selectFetchRouteError, selectLoadingRoute} from "@/store/route/selectors";

export const selectShowHistoryCard = memoize((state: RootState) => state.ui.showHistoryCard)

export const selectShowBestCard = memoize((state: RootState) => state.ui.showBestCard)

export const selectShowMoreCard = memoize((state: RootState) => state.ui.showMoreCard)

export const selectSwiperInstance = memoize((state: RootState) => state.ui.swiper);

export const selectActiveIndex = memoize((state: RootState) => state.ui.activeIndex);

export const selectEmbAbi = memoize((state: RootState) => state.ui.embApi);

export const selectCanSlidePrev = memoize((state: RootState) => {
   const showHistory = selectShowHistoryCard(state);
   const showBest = selectShowBestCard(state);
   const showMore = selectShowMoreCard(state);
   const activeIndex = selectActiveIndex(state);

   if (activeIndex === 0) {
       return false;
   } else if (activeIndex === 1) {
       return showHistory;
   }
   return true;
});

export const selectCanSlideNext = memoize((state: RootState) => {
   const showBest = selectShowBestCard(state);
   const showMore = selectShowMoreCard(state);
   const activeIndex = selectActiveIndex(state);

   if (activeIndex === 3) {
      return false;
   } else if (activeIndex === 2) {
      return showMore;
   } else if (activeIndex === 1) {
      return showBest;
   }
   return true;
});

export const selectBestRouteCardShow = memoize((state: RootState) => {
   const bestRoute = selectBestRoute(state);
   const routeLoading = selectLoadingRoute(state);
   const routeError = selectFetchRouteError(state);
   console.log(bestRoute, routeLoading, routeError, 'bestRoute')
   return !!bestRoute || routeLoading || !!routeError;
});
