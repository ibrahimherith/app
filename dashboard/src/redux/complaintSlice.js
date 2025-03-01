import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const submitComplaint = createAsyncThunk(
  "complaint/submit",
  async (formData, { rejectWithValue }) => {
    try {
      // Create FormData object for file upload
      const data = new FormData();

      // Add file if it exists
      if (formData.file) {
        data.append("file", formData.file);
      }

      // Add other form fields
      Object.keys(formData).forEach((key) => {
        if (key !== "file") {
          data.append(key, formData[key]);
        }
      });

      const response = await axios.post(`${API_URL}/submit`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to submit complaint" }
      );
    }
  }
);

export const fetchComplaints = createAsyncThunk(
  "complaint/fetchComplaints",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/complaints`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch complaints" }
      );
    }
  }
);

const initialState = {
  complaints: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  lastSubmission: null,
};

const complaintSlice = createSlice({
  name: "complaint",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitComplaint.pending, (state) => {
        state.status = "loading";
      })
      .addCase(submitComplaint.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.lastSubmission = action.payload.data;
      })
      .addCase(submitComplaint.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to submit complaint";
      })
      .addCase(fetchComplaints.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchComplaints.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.complaints = action.payload;
      })
      .addCase(fetchComplaints.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.message || "Failed to fetch complaints";
      });
  },
});

export const { resetStatus } = complaintSlice.actions;
export default complaintSlice.reducer;
