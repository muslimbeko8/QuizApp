import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://opentdb.com/api.php"}),
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: ({ category, difficulty }) => ({
        url: "/",
        params: {
          amount: 10,
          category,
          difficulty
        },
      }),
    }),
  }),
});

export const { useGetQuestionsQuery } = api;
export default api;
