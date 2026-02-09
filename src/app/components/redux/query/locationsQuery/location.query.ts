import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Location {
  _id: string;
  name: string;
  description?: string;
  area: string;
  location: string;
  operation_hours?: string;
  branchEmail?: string;
  telephone?: string;
  mobileNumber?: string;
  createdAt?: string;
  updatedAt?: string;
  imagePath?: string;
  lat?: any;
  lng?: any;
}

export interface CreateLocationPayload {
  name: string;
  description?: string;
  area: string;
  location: string;
  operation_hours?: string;
  branchEmail?: string;
  telephone?: string;
  mobileNumber?: string;
}

export interface UpdateLocationPayload extends Partial<CreateLocationPayload> {
  id: string;
}
export interface SelectLocationPayload {
  locationId: string;
}

export const locationsApi = createApi({
  reducerPath: "locationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  tagTypes: ["Locations"],
  endpoints: (builder) => ({
    getLocations: builder.query<Location[], void>({
      query: () => "locations",
      providesTags: ["Locations"],
    }),

    getLocationById: builder.query<Location, string>({
      query: (id) => `locations/${id}`,
      providesTags: (result, error, id) => [{ type: "Locations", id }],
    }),

    createLocation: builder.mutation<Location, CreateLocationPayload>({
      query: (body) => ({
        url: "locations",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Locations"],
    }),

    updateLocation: builder.mutation<Location, UpdateLocationPayload>({
      query: ({ id, ...body }) => ({
        url: `locations/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Locations"],
    }),

    deleteLocation: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `locations/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Locations"],
    }),

    selectLocation: builder.mutation<
      { message: string; locationId: string },
      SelectLocationPayload
    >({
      query: (body) => ({
        url: "locations/select",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Locations"],
    }),

    getSelectedLocation: builder.query<{ locationId: string }, void>({
      query: () => "locations/selected",
      providesTags: ["Locations"],
    }),

    updateSelectedLocation: builder.mutation<
      { message: string; locationId: string },
      SelectLocationPayload
    >({
      query: (body) => ({
        url: "locations/selected",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Locations"],
    }),
  }),
});

export const {
  useGetLocationsQuery,
  useGetLocationByIdQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
  useSelectLocationMutation,
  useGetSelectedLocationQuery,
  useUpdateSelectedLocationMutation,
} = locationsApi;
