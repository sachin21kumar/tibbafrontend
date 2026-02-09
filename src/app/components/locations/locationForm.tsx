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
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 800));

    setSuccess(true);
    reset();
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[18px] sm:text-[22px] lg:text-[26px] text-[#d1a054] leading-[0.9] sm:leading-[0.8] lg:leading-[0.7]">
            Send Us a Message
          </p>

          <div className="h-px w-[200px] sm:w-[260px] lg:w-[330px] mx-auto bg-gradient-to-r from-transparent via-[#d1a054] to-transparent" />

          <button className="text-[20px] sm:text-[26px] lg:text-[34px] text-[#d1a054] p-[6px] sm:p-[8px] lg:p-[9px] leading-7 font-normal">
            CONTACT FORM
          </button>

          <div className="h-px w-[200px] sm:w-[260px] lg:w-[330px] mx-auto bg-gradient-to-r from-transparent via-[#d1a054] to-transparent" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-16 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#7A4A2E]">
                Your Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className={`w-full border-b bg-transparent text-[#9B7A63] outline-none font-serif
                  ${errors.name ? "border-red-500" : "border-[#d1a054]"}
                `}
              />
              {errors.name && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#3E2415] ">
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
                className={`w-full border-b bg-transparent outline-none  text-[#9B7A63] font-serif
                  ${errors.email ? "border-red-500" : "border-[#d1a054]"}
                `}
              />
              {errors.email && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#3E2415]">
                Your Phone
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: "Phone number is required",
                })}
                className={`w-full border-b text-[#9B7A63] bg-transparent outline-none font-serif
                  ${errors.phone ? "border-red-500" : "border-[#d1a054]"}
                `}
              />
              {errors.phone && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.phone.message}
                </span>
              )}
            </div>
          </div>
          <div className="m-0">
            <label className="block text-xs  uppercase tracking-widest text-[#3E2415]">
              Your Message
            </label>
            <textarea
              rows={1}
              {...register("message")}
              className="w-full resize-none  border-b text-[#9B7A63] border-[#d1a054] bg-transparent outline-none font-serif"
            />
          </div>
          <div className="flex flex-col items-center mt-8 gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-[#12171a] cursor-pointer px-12 py-4 text-sm tracking-widest text-white transition hover:bg-white hover:border-[#d1a054] hover:border hover:text-[#d1a054] disabled:opacity-60 hover:-translate-y-[3px]
    hover:shadow-[0_0_6px_rgba(0,0,0,0.15)]
    transition-all
    duration-200"
            >
              {isSubmitting ? "SENDING..." : "BOOK A TABLE"}
            </button>
            {success && (
              <div className="text-sm border-t mt-5 border-b p-4 border-green-600 text-[#d1a054] font-[system-ui] w-full text-center">
                Thank you for your message. It has been sent.
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
