import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApi';
import { threadApi } from '../features/thread/threadApi';
import { profileApi } from '../features/profile/profileApi';
import { threadViewApi } from '../features/threadView/threadViewApi';
import authReducer from "../features/auth/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [threadApi.reducerPath]: threadApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [threadViewApi.reducerPath]: threadViewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(threadApi.middleware)
      .concat(profileApi.middleware)
      .concat(threadViewApi.middleware),
});
