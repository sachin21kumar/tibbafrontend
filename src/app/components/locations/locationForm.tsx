"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useTranslations } from "@/i18n/TranslationProvider";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message?: string;
};

export default function ContactForm() {
  const { locale, t } = useTranslations();

  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 800));

    setSuccess(true);
    reset();
  };

  return (
    <section className="bg-white py-24 font-semibold">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[18px] sm:text-[22px] lg:text-[26px] text-[#AD5727] leading-[0.9] sm:leading-[0.8] lg:leading-[0.7]">
            {t("contact_form.subtitle")}
          </p>

          <div className="h-px w-[200px] sm:w-[260px] lg:w-[330px] mx-auto bg-gradient-to-r from-transparent via-[#AD5727] to-transparent" />

          <button className="text-[20px] sm:text-[26px] lg:text-[34px] text-[#AD5727] p-[6px] sm:p-[8px] lg:p-[9px] leading-7 font-normal">
            {t("contact_form.title")}
          </button>

          <div className="h-px w-[200px] sm:w-[260px] lg:w-[330px] mx-auto bg-gradient-to-r from-transparent via-[#AD5727] to-transparent" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-16 mt-10 font-semibold"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#AD5727]">
                {t("contact_form.name")}
              </label>
              <input
                {...register("name", {
                  required: t("validation.name_required"),
                })}
                className={`w-full border-b  bg-transparent text-[#AD5727] outline-none font-serif
                  ${errors.name ? "border-red-500" : "border-[#AD5727]"}
                `}
              />
              {errors.name && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#AD5727] ">
                {t("contact_form.email")}
              </label>
              <input
                type="email"
                {...register("email", {
                  required: t("validation.email_required"),
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: t("validation.invalid_email"),
                  },
                })}
                className={`w-full border-b bg-transparent outline-none  text-[#AD5727] font-serif
                  ${errors.email ? "border-red-500" : "border-[#AD5727]"}
                `}
              />
              {errors.email && (
                <span className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#AD5727]">
                {t("contact_form.phone")}
              </label>
              <input
                type="tel"
                {...register("phone", {
                  required: t("validation.phone_required"),
                })}
                className={`w-full border-b text-[#9B7A63] bg-transparent outline-none font-serif
                  ${errors.phone ? "border-red-500" : "border-[#AD5727]"}
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
            <label className="block text-xs  uppercase tracking-widest text-[#AD5727]">
              {t("contact_form.message")}
            </label>
            <textarea
              rows={1}
              {...register("message")}
              className="w-full resize-none  border-b text-[#AD5727] border-[#AD5727] bg-transparent outline-none font-serif"
            />
          </div>
          <div className="flex flex-col items-center mt-8 gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-white cursor-pointer border border-[#AD5727] px-12 py-4 text-sm tracking-widest text-[#AD5727] transition hover:bg-white hover:border-[#AD5727] hover:border hover:text-[#AD5727] disabled:opacity-60 hover:-translate-y-[3px]
    hover:shadow-[0_0_6px_rgba(0,0,0,0.15)]
    transition-all
    duration-200"
            >
              {isSubmitting
                ? t("contact_form.sending")
                : t("contact_form.button")}
            </button>
            {success && (
              <div className="text-sm border-t mt-5 border-b p-4 border-green-600 text-[#d1a054] font-[system-ui] w-full text-center">
                {t("contact_form.success")}
              </div>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
