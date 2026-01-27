"use client";

import { useForm } from "react-hook-form";
import { useCreateLocationMutation } from "../../redux/query/locationsQuery/location.query";

type AddLocationForm = {
  name: string;
  description: string;
  area: string;
  location: string;
  operation_hours: string;
  branchEmail: string;
  telephone: string;
  mobileNumber: string;
  lat: string;
  lng: string;
  image: FileList;
};

export const AddLocation = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddLocationForm>();

  const [createLocation, { isLoading }] = useCreateLocationMutation();

  const onSubmit = async (data: AddLocationForm) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("area", data.area);
      formData.append("location", data.location);
      formData.append("operation_hours", data.operation_hours);
      formData.append("branchEmail", data.branchEmail);
      formData.append("telephone", data.telephone);
      formData.append("mobileNumber", data.mobileNumber);

      // ✅ REQUIRED LAT LNG
      formData.append("lat", data.lat);
      formData.append("lng", data.lng);

      // ✅ REQUIRED IMAGE
      formData.append("image", data.image[0]);

      await createLocation(formData as any).unwrap();
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto max-w-6xl px-6">

        {/* Heading */}
        <div className="text-center mb-20">
          <div className="flex justify-center">
            <p className="font-[allura] text-[#d1a054] text-2xl mb-2 border-b border-[#d1a054] w-[380px]">
              Manage Branches
            </p>
          </div>
          <div className="flex justify-center">
            <h2 className="text-4xl tracking-widest border-b border-[#d1a054] text-[#d1a054] w-[380px]">
              ADD LOCATION
            </h2>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">

          {/* Name + Area */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
                Location Name *
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className={`w-full border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none
                  ${errors.name ? "border-red-500" : "border-[#d1a054]"}`}
              />
              {errors.name && (
                <span className="text-xs text-red-500">{errors.name.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
                Area *
              </label>
              <input
                {...register("area", { required: "Area is required" })}
                className={`w-full border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none
                  ${errors.area ? "border-red-500" : "border-[#d1a054]"}`}
              />
              {errors.area && (
                <span className="text-xs text-red-500">{errors.area.message}</span>
              )}
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
              Location / Address *
            </label>
            <input
              {...register("location", { required: "Location is required" })}
              className={`w-full border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none
                ${errors.location ? "border-red-500" : "border-[#d1a054]"}`}
            />
            {errors.location && (
              <span className="text-xs text-red-500">{errors.location.message}</span>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
              Description *
            </label>
            <textarea
              rows={1}
              {...register("description", { required: "Description is required" })}
              className={`w-full resize-none border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none
                ${errors.description ? "border-red-500" : "border-[#d1a054]"}`}
            />
            {errors.description && (
              <span className="text-xs text-red-500">
                {errors.description.message}
              </span>
            )}
          </div>

          {/* Contact Info */}
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
                Operation Hours *
              </label>
              <input
                {...register("operation_hours", {
                  required: "Operation hours required",
                })}
                className={`w-full border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none
                  ${errors.operation_hours ? "border-red-500" : "border-[#d1a054]"}`}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
                Branch Email *
              </label>
              <input
                type="email"
                {...register("branchEmail", {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                })}
                className={`w-full border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none
                  ${errors.branchEmail ? "border-red-500" : "border-[#d1a054]"}`}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
                Telephone *
              </label>
              <input
                {...register("telephone", { required: "Telephone is required" })}
                className={`w-full border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none
                  ${errors.telephone ? "border-red-500" : "border-[#d1a054]"}`}
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
              Mobile Number *
            </label>
            <input
              {...register("mobileNumber", {
                required: "Mobile number required",
                minLength: { value: 10, message: "Minimum 10 digits" },
              })}
              className={`w-full border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none
                ${errors.mobileNumber ? "border-red-500" : "border-[#d1a054]"}`}
            />
          </div>

          {/* ✅ LAT / LNG */}
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
                Latitude *
              </label>
              <input
                type="number"
                step="any"
                {...register("lat", { required: "Latitude is required" })}
                className={`w-full border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none
                  ${errors.lat ? "border-red-500" : "border-[#d1a054]"}`}
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
                Longitude *
              </label>
              <input
                type="number"
                step="any"
                {...register("lng", { required: "Longitude is required" })}
                className={`w-full border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none
                  ${errors.lng ? "border-red-500" : "border-[#d1a054]"}`}
              />
            </div>
          </div>

          {/* ✅ IMAGE */}
          <div>
            <label className="block text-xs uppercase tracking-widest cursor-pointer text-[#7A4A2E]">
              Location Image *
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: "Image is required" })}
              className="mt-2 block text-[#7A4A2E] cursor-pointer w-full text-sm"
            />
            {errors.image && (
              <span className="text-xs text-red-500">{errors.image.message}</span>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-center mt-12">
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-full bg-[#12171a] cursor-pointer px-12 py-4 text-sm tracking-widest text-white transition hover:bg-white hover:border-[#d1a054] hover:border hover:text-[#d1a054] disabled:opacity-60 hover:-translate-y-[3px]
    hover:shadow-[0_0_6px_rgba(0,0,0,0.15)]
    transition-all
    duration-200"
            >
              {isLoading ? "SAVING..." : "ADD LOCATION"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
