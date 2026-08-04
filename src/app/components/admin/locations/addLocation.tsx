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
  googleLink: string;
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
      formData.append("location", data.location);
      formData.append("operation_hours", data.operation_hours);
      formData.append("telephone", data.telephone);
      formData.append("mobileNumber", data.mobileNumber);

      if (data.area) formData.append("area", data.area);
      if (data.description) formData.append("description", data.description);
      if (data.branchEmail) formData.append("branchEmail", data.branchEmail);
      if (data.lat) formData.append("lat", data.lat);
      if (data.lng) formData.append("lng", data.lng);
      if (data.googleLink) formData.append("googleLink", data.googleLink);

      if (data.image?.[0]) formData.append("image", data.image[0]);

      await createLocation(formData as any).unwrap();
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto max-w-6xl px-6">
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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16">
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
                <span className="text-xs text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
                Area
              </label>
              <input
                {...register("area")}
                className="w-full border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none border-[#d1a054]"
              />
            </div>
          </div>

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
              <span className="text-xs text-red-500">
                {errors.location.message}
              </span>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
              Description
            </label>
            <textarea
              rows={1}
              {...register("description")}
              className="w-full resize-none border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none border-[#d1a054]"
            />
          </div>

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
                Branch Email
              </label>
              <input
                type="email"
                {...register("branchEmail", {
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
                {...register("telephone", {
                  required: "Telephone is required",
                })}
                className={`w-full border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none
                  ${errors.telephone ? "border-red-500" : "border-[#d1a054]"}`}
              />
            </div>
          </div>

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

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
                Latitude
              </label>
              <input
                type="number"
                step="any"
                {...register("lat")}
                className="w-full border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none border-[#d1a054]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
                Longitude
              </label>
              <input
                type="number"
                step="any"
                {...register("lng")}
                className="w-full border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none border-[#d1a054]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
              Google Map Link
            </label>
            <input
              type="url"
              placeholder="https://maps.app.goo.gl/..."
              {...register("googleLink")}
              className="w-full border-b text-[#7A4A2E] !font-[system-ui] bg-transparent outline-none border-[#d1a054]"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest cursor-pointer text-[#7A4A2E]">
              Location Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="mt-2 block text-[#7A4A2E] cursor-pointer w-full text-sm"
            />
          </div>

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
