import { SHOWLOADER, HIDELOADER } from '../store/actions/actionTypes'

export const loaderFunction = async (params, apiCall, dispatch) => {
  try {
    dispatch({ type: SHOWLOADER })
    const { data } = await apiCall(params)
    dispatch({ type: HIDELOADER })
    return data
  } catch (error) {
    const errMessage = error.response?.data?.message
    dispatch({ type: SHOWLOADER, payload: errMessage })
    return
  }
}
