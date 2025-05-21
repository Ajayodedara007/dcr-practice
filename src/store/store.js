import { configureStore } from "@reduxjs/toolkit";
import mainSlice from "./MainSlice";

export const store = configureStore({
  reducer: {
    main: mainSlice,
  },
});
