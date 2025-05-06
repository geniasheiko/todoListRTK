import type { RequestStatus } from "@/common/types"
import { createSlice, isFulfilled, isPending, isRejected } from "@reduxjs/toolkit"

export const appSlice = createSlice({
  name: "app",
  initialState: {
    themeMode: "light" as ThemeMode,
    status: "idle" as RequestStatus,
    error: null as string | null,
    isLoggedIn: false,
  },
  selectors: {
    selectThemeMode: (state) => state.themeMode,
    selectAppStatus: (state) => state.status,
    selectAppError: (state) => state.error,
    selectIsLoggedIn: (state) => state.isLoggedIn,
  },
  extraReducers: (builder) => {
    builder
    .addMatcher(isPending, (state) => {
      state.status = "loading"
    })
    .addMatcher(isFulfilled, (state) => {
      state.status = "succeeded"
    })
    .addMatcher(isRejected, (state) => {
      state.status = "failed"
    })
      // .addMatcher(
      //   (action) => action.type.endsWith("/fulfilled"), //обработка выключение loaders, 
      //   (state) => {                                   // когда action отрабатывает успешно (succeeded)
      //     state.status = "succeeded"
      //   },
      // )
      // .addMatcher(
      //   (action) => action.type.endsWith("/rejected"), //обработка выключение loaders, 
      //   (state) => {                                  // когда action отрабатывает с ошибкой (rejected)
      //     state.status = "failed"
      //   },
      // )
      // .addMatcher(
      //   (action) => {
      //     // type predicate function
      //     return action.type.endsWith('/pending')
      //   },
      //   (state, action) => {
      //     // change state
      //     state.status = 'loading'
      //   },
      // )
  },
  reducers: (create) => ({
    changeThemeModeAC: create.reducer<{ themeMode: ThemeMode }>((state, action) => {
      state.themeMode = action.payload.themeMode
    }),
    setAppStatusAC: create.reducer<{ status: RequestStatus }>((state, action) => {
      state.status = action.payload.status
    }),
    setAppErrorAC: create.reducer<{ error: string | null }>((state, action) => {
      state.error = action.payload.error
    }),
    setIsLoggedInAC: create.reducer<{ isLoggedIn: boolean }>((state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    }),
  }),
})

export const { selectThemeMode, selectAppStatus, selectAppError, selectIsLoggedIn } = appSlice.selectors
export const { changeThemeModeAC, setAppStatusAC, setAppErrorAC, setIsLoggedInAC } = appSlice.actions
export const appReducer = appSlice.reducer

export type ThemeMode = "dark" | "light"
