import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState: any = {};

export const clearState = createAction("clear-state");

export const PlayBackUrl = createAction(
  "playback-url",
  function videoUrl(url: any) {
    return {
      payload: { data: url },
    };
  }
);

export const ContentFormat = createAction(
  "playback-format",
  function format(value: any) {
    return {
      payload: { data: value },
    };
  }
);
export const DRMcontentURL = createAction(
  "drmcontent-name",
  function drmcontent(value: any) {
    return {
      payload: { data: value },
    };
  }
);

export const ContentName = createAction(
  "content-name",
  function content(value: any) {
    return {
      payload: { data: value },
    };
  }
);



const playerSlice = createSlice({
  name: "videoPlayer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(PlayBackUrl, (state = { PlayBackUrl }, action) => {
      state.PlayBackUrlData = action.payload.data;
    });

    builder.addCase(ContentFormat, (state = { ContentFormat }, action) => {
      state.ContentFormatData = action.payload.data;
    });

    builder.addCase(ContentName, (state = { ContentName }, action) => {
      state.ContentNameData = action.payload.data;
    });
    builder.addCase(DRMcontentURL, (state = { DRMcontentURL }, action) => {
      state.DRMcontentNameData = action.payload.data;
    });
  },
});

export const playerReducer = playerSlice.reducer;
