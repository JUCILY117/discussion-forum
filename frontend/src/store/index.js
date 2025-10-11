import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../features/auth/authApi';
import { threadApi } from '../features/thread/threadApi';
import authReducer from "../features/auth/authSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [threadApi.reducerPath]: threadApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(threadApi.middleware),
});
