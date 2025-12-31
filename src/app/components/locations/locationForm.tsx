"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message?: string;
};

export default function ContactForm() {
  const [success, setSuccess] = useState(false); // ✅ NEW

  const {
    register,
    handleSubmit,
    reset, // ✅ NEW
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    // simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSuccess(true); // ✅ show success message
    reset(); // ✅ clear form
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[26px]  text-[#d1a054] leading-[0.7]">Send Us a Message</p>
          <div className="h-px w-[330px] mx-auto bg-gradient-to-r from-transparent via-black to-transparent" />

          <button className="text-lg text-black p-[9px] leading-7 text-[34px] font-normal">
            CONTACT FORM
          </button>
          <div className="h-px w-[330px] mx-auto bg-gradient-to-r from-transparent via-black to-transparent" />
        </div>
        

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 mt-10">

          {/* Inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            {/* Name */}
            <div >
              <label className="block text-xs uppercase tracking-widest text-gray-500">
                Your Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className={`w-full border-b bg-transparent outline-none font-serif
                  ${errors.name ? "border-red-500" : "border-gray-400"}
                `}
              />
              {errors.name && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500">
                Your Email
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email address",
                  },
                })}
                className={`w-full border-b bg-transparent outline-none font-serif
                  ${errors.email ? "border-red-500" : "border-gray-400"}
                `}
              />
              {errors.email && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs uppercase tracking-widest text-gray-500">
                Your Phone
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                })}
                className={`w-full border-b bg-transparent outline-none font-serif
                  ${errors.phone ? "border-red-500" : "border-gray-400"}
                `}
              />
              {errors.phone && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>

          {/* Message */}
          <div className="m-0">
            <label className="block text-xs uppercase tracking-widest text-gray-500">
              Your Message
            </label>
            <textarea
              rows={1}
              {...register("message")}
              className="w-full resize-none border-b border-gray-400 bg-transparent outline-none font-serif"
            />
          </div>

          {/* Submit + Success */}
          <div className="flex flex-col items-center mt-8 gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-[#12171a] px-12 py-4 text-sm tracking-widest text-white transition hover:bg-black disabled:opacity-60"
            >
              {isSubmitting ? "SENDING..." : "BOOK A TABLE"}
            </button>

            {/* ✅ Success Message */}
            {success && (
              <div className="text-sm border-t mt-5 border-b p-4 border-green-600 font-[system-ui] w-full text-center">
                Thank you for your message. It has been sent.
              </div>
            )}
          </div>

        </form>
      </div>
    </section>
  );
}
