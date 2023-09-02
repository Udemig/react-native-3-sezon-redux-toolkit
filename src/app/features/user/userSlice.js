import axios from 'axios';

const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit');

const initialState = {
  value: 0,
  users: [],
  loading: false,
  error: false,
};

export const fetchUsers = createAsyncThunk('fetchUsers', async () => {
  try {
    const response = await axios.get(
      'https://random-data-api.com/api/v2/users?size=10',
    );

    const {status, data} = response;

    if (status === 200) {
      return {users: data ?? []};
    } else {
      return {users: []};
    }
  } catch (error) {
    console.log('Error fetching users');
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsers.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = false;
        state.users = action.payload.users;
      })
      .addCase(fetchUsers.rejected, state => {
        state.error = true;
        state.loading = false;
      });
  },
});

export default userSlice.reducer;
