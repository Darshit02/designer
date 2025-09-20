import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type AutoSavePojectResponse = {
  success: boolean;
  message: string;
  eventId: string;
};

type AutoSavePojectRequest = {
  projectId: string;
  userId: string;
  shapesData: {
    shapes: Record<string, unknown>;
    tools: string;
    selected: Record<string, unknown>;
    freamCounter: number;
  };
  viewPortData?: {
    scale: number;
    translate: {
      x: number;
      y: number;
    };
  };
};

export const ProjectApi = createApi({
  reducerPath: "projectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/project",
  }),
  tagTypes: ["Project"],
  endpoints: (builder) => ({
    autosaveProject: builder.mutation<AutoSavePojectResponse, AutoSavePojectRequest>({
      query: (data) => ({
        url: "",
        method: "PATCH",
        body: data
      }),
    }),
  }),
});
