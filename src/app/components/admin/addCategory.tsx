"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useAddCategoryMutation } from "../redux/query/categoryQuery/categoryQuery";
import { useTranslations } from "@/i18n/TranslationProvider";

interface CategoryFormValues {
  title: string;
}

export const AddCategory = () => {
  const { t } = useTranslations();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryFormValues>();

  const [addCategory, { isLoading }] = useAddCategoryMutation();
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    try {
      await addCategory({ title: data.title.trim() }).unwrap();
      setMessage("✅ Category added successfully");
      reset();
    } catch (error: any) {
      if (Array.isArray(error?.data?.message)) {
        setMessage(error.data.message.join(", "));
      } else {
        setMessage("❌ Failed to add category");
      }
    }
  };

  return (
    <div className="min-h-[87vh] flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white rounded-xl shadow-md p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold text-center text-[#7a4a2e]">
          {t("category.addCategory")}
        </h2>

        <div>
          <input
            type="text"
            placeholder={t("category.categoryTitle")}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 text-[#7a4a2e] !font-[system-ui] focus:ring-[#d1a054]"
            {...register("title", {
              required: t("validation.category_title"),
              validate: (v) =>
                v.trim().length > 0 || "Title should not be empty",
            })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#d1a054] text-white py-2 rounded-lg hover:bg-[#c18f47] transition disabled:opacity-70"
        >
          {isLoading ? t("category.saving") : t("category.addCategory")}
        </button>
      </form>
    </div>
  );
};
