import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from '../services/authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ?? null,
    error: false,
    sucsses: false,
    loading: false
}

// register as user and sign in
export const register = createAsyncThunk('auth/register',
    async (user, thunkAPI) => {
        const data = await authService.register(user)

        // check for erros
        if (data.errors) {
            return thunkAPI.rejectWithValue(data.errors[0])
        }

        return data
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.loading = false
            state.error = false
            state.sucsses = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending,
                (state) => {
                    state.loading = true
                    state.error = false
                })
            .addCase(register.fulfilled,
                (state, action) => {
                    state.loading = false
                    state.sucsses = true
                    state.error = null
                    state.user = action.payload
                })
            .addCase(register.rejected,
                (state, action) => {
                    state.loading = false
                    state.error = action.payload
                    state.user = null
                })
    }
})

export const { reset } = authSlice.actions
export default authSlice.reducer

