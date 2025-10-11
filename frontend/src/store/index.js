import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApi';
import { threadApi } from '../features/thread/threadApi';
import { profileApi } from '../features/profile/profileApi';
import authReducer from "../features/auth/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [threadApi.reducerPath]: threadApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(threadApi.middleware)
      .concat(profileApi.middleware),
});
