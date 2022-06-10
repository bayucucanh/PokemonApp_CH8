import { LOADING, REFRESH } from "../Types";

export const loading = val => ({
  type: LOADING,
  payload: val
})

export const refresh = val => ({
  type: REFRESH,
  payload: val
})
