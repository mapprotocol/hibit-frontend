import {createAsyncThunk} from "@reduxjs/toolkit";

const toggleHistory = createAsyncThunk<
    boolean,
    {show: boolean, historyCardClassName?: string,}
>(
    "ui/toggleHistory",
    async ({show, historyCardClassName}) => {
        if (show) {
            return true;
        }
        return false;
    }
);

export default toggleHistory;
