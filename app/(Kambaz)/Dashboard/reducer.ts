import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";
const initialState = {
  enrollments: enrollments,
};
const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enrollCourse: (state, { payload }: { payload: { userId: string; courseId: string } }) => {
        state.enrollments.push({
            _id: uuidv4(),
            user: payload.userId,
            course: payload.courseId,
          });
        
    },
    unenrollCourse: (state, { payload }: { payload: { userId: string; courseId: string } }) => {
        state.enrollments = state.enrollments.filter(
          (e: any) => !(e.user === payload.userId && e.course === payload.courseId)
        );
    },
},
});
export const { enrollCourse, unenrollCourse } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;


