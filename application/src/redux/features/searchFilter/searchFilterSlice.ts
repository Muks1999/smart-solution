import { createSlice } from '@reduxjs/toolkit'

interface SearchFilterState {
  value: string,
  url: string,
  tab: string,
}

const initialState = {value : "", url: "", tab: ""} as SearchFilterState

const slice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchState:(state, action)=> {  
      state.value = action?.payload?.value;   
      state.url = action?.payload?.url;   
      state.tab = action?.payload?.tab ?? "";   
    },
    resetSearchState:(state)=>{
      state.value = "";   
      state.url = "";   
      state.tab = ""; 
    }
  },
})

export const { setSearchState, resetSearchState } = slice.actions
export default slice.reducer
export const getSearchInfo = (state: any) => state?.search