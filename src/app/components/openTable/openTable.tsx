"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

type FormValues = {
  date: string;
  time: string;
  guests: string;
};

export default function OpenTable() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      date: today,
      time: "7:00 PM",
      guests: "2",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setErrorMsg("");

      await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/reservation`, {
        date: data.date,
        time: data.time,
        guests: Number(data.guests),
      });

      const query = new URLSearchParams(data).toString();
      router.push(`/reservation?${query}`);
    } catch (error: any) {
      setErrorMsg(
        error?.response?.data?.message || "Failed to create reservation",
      );
    }
  };

  const generateTimeSlots = () => {
    const times: string[] = [];
    let hour = 9;
    let minute = 0;

    while (hour < 22 || (hour === 22 && minute === 0)) {
      const period = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 === 0 ? 12 : hour % 12;
      const displayMinute = minute === 0 ? "00" : "30";

      times.push(`${displayHour}:${displayMinute} ${period}`);

      minute += 30;
      if (minute === 60) {
        minute = 0;
        hour++;
      }
    }
    return times;
  };

  return (
    <>
      <div
        className="w-full h-64 md:h-100 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url('/header.webp')`,
        }}
      >
        <h1 className="text-white text-4xl md:text-5xl font-cinzel bg-white/10 border-white/32 backdrop-blur-[20px] px-6 py-5">
          Open Table
        </h1>
      </div>
      <div className="w-full p-8 mx-auto">
        <div className="text-center mb-8 grid justify-center">
          <p className="text-[#d1a054] italic text-[26px] font-[system-ui] border-b border-b-[#d1a054] w-[282px]">
            Open Table
          </p>
          <h1 className="text-3xl mt-1 border-b border-[#d1a054] text-[#d1a054] inline-block pb-2">
            RESERVATION
          </h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-9">
          <div className="max-w-[1288px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div className="flex flex-col">
              <label className="text-[#d1a054] text-[12px] mb-1">DATE</label>
              <input
                type="date"
                className="border-b border-[#d1a054] text-[#d1a054] py-2 bg-transparent focus:outline-none"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <span className="text-red-500 text-[11px]">
                  {errors.date.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-[#d1a054] text-[12px]">TIME</label>
              <select
                className="border-b border-[#d1a054] text-[#d1a054] py-2 bg-transparent focus:outline-none"
                {...register("time", { required: "Time is required" })}
              >
                {generateTimeSlots().map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.time && (
                <span className="text-red-500 text-[11px]">
                  {errors.time.message}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="text-[#d1a054] text-[12px] ">
                GUEST NUMBER
              </label>
              <select
                className="border-b border-[#d1a054] text-[#d1a054] py-2 bg-transparent focus:outline-none"
                {...register("guests", { required: "Guests required" })}
              >
                {Array.from({ length: 9 }, (_, i) => (
                  <option key={i + 2} value={i + 2}>
                    {i + 2}
                  </option>
                ))}
              </select>
              {errors.guests && (
                <span className="text-red-500 text-[11px]">
                  {errors.guests.message}
                </span>
              )}
            </div>

            {errorMsg && (
              <div className="md:col-span-3 text-center text-red-600 text-sm">
                {errorMsg}
              </div>
            )}

            <div className="md:col-span-3 text-center mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="hover:bg-white hover:text-[#d1a054] hover:border-[#d1a054] hover:border bg-gray-900 text-white py-3 px-8 rounded-full hover:bg-gray-800 cursor-pointer transition disabled:opacity-50"
              >
                {isSubmitting ? "BOOKING..." : "FIND A TABLE"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
