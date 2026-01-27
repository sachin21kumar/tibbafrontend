"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

type FormValues = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  occasion?: string;
  request?: string;
  offers: boolean;
  opentableEmails: boolean;
  smsUpdates: boolean;
};

export default function ReservationDetails() {
  const params = useSearchParams();

  const date = params.get("date") || "";
  const time = params.get("time") || "";
  const guests = params.get("guests") || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(1, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const payload = {
        date,
        time,
        guests: parseInt(guests),
        ...data,
      };

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/reservationhotel`,
        payload
      );
      reset();
      toast.success("Reservation completed successfully");

    } catch (err: any) {
      toast.error(
        err?.response?.data?.message || "Failed to complete reservation"
      );

      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center md:p-6">
      <div className="bg-white w-full max-w-[640px] p-6 rounded-lg shadow">
        <div className="flex justify-center mb-6 mt-10 border-b border-b-gray-200 pb-4 text-sm">
          <div className="flex gap-6 text-gray-500">
            <span className="flex items-center gap-2 text-green-600">
              <span className="w-5 h-5 rounded-full bg-green-600 text-white flex items-center justify-center text-xs">
                ✓
              </span>
              Find a table
            </span>
            <span className="flex items-center gap-2 text-red-600">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-xs">
                2
              </span>
              Add your details
            </span>
          </div>
        </div>

        <h2 className="text-xl font-semibold font-[system-ui] text-[#d1a054] mb-4">
          You’re almost done!
        </h2>

        <div className="flex gap-4 mb-4">
          <div className="w-14 h-14 bg-gray-200 rounded md:block hidden"></div>
          <div>
            <h3 className="font-semibold text-[#d1a054]">Max Restaurant</h3>
            <div className="text-sm text-[#7a4a2e]">
              {date} · {time} · {guests} people (Standard seating)
            </div>
          </div>
        </div>

        <div className="bg-blue-50 text-sm text-[#7a4a2e] p-3 rounded mb-4">
          We’re holding this table for you for{" "}
          <strong>{formatTime(timeLeft)}</strong>
        </div>

        <h4 className="font-semibold mb-3 text-[#d1a054]">Diner details</h4>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                className="border border-[#d1a054] focus:ring-[#d1a054] focus:outline-none text-[#7a4a2e] !font-[system-ui] p-3 rounded w-full"
                placeholder="First name"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <span className="text-red-700 text-[11px]">
                  {String(errors.firstName.message)}
                </span>
              )}
            </div>

            <div>
              <input
                className="border border-[#d1a054] focus:ring-[#d1a054] focus:outline-none text-[#7a4a2e] !font-[system-ui] p-3 rounded w-full"
                placeholder="Last name"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <span className="text-red-700 text-[11px]">
                  {String(errors.lastName.message)}
                </span>
              )}
            </div>

            <div>
              <input
                className="border border-[#d1a054] focus:ring-[#d1a054] focus:outline-none text-[#7a4a2e] !font-[system-ui] p-3 rounded w-full"
                placeholder="Phone number"
                {...register("phone", { required: "Phone number is required" })}
              />
              {errors.phone && (
                <span className="text-red-700 text-[11px]">
                  {String(errors.phone.message)}
                </span>
              )}
            </div>

            <div>
              <input
                className="border border-[#d1a054] focus:ring-[#d1a054] focus:outline-none text-[#7a4a2e] !font-[system-ui] p-3 rounded w-full"
                placeholder="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-700 text-[11px]">
                  {String(errors.email.message)}
                </span>
              )}
            </div>

            <select
              className="border border-[#d1a054] focus:ring-[#d1a054] focus:outline-none text-[#7a4a2e] !font-[system-ui] p-3 rounded md:col-span-2"
              {...register("occasion")}
            >
              <option>Select an occasion (optional)</option>
              <option>Birthday</option>
              <option>Anniversary</option>
            </select>

            <textarea
              className="border p-3 border-[#d1a054] focus:ring-[#d1a054] focus:outline-none rounded md:col-span-2"
              placeholder="Add a special request (optional)"
              maxLength={75}
              {...register("request")}
            />
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <label className="flex items-center gap-2 text-[#7a4a2e]">
              <input type="checkbox" {...register("offers")} />
              Sign me up to receive dining offers from this restaurant.
            </label>

            <label className="flex items-center gap-2 text-[#7a4a2e]">
              <input type="checkbox" {...register("opentableEmails")} />
              Receive OpenTable updates by email.
            </label>

            <label className="flex items-center gap-2 text-[#7a4a2e]">
              <input type="checkbox" {...register("smsUpdates")} />
              Get text reminders about my reservation.
            </label>
          </div>

          <div className="py-6">
            <button
              type="submit"
              className="bg-[#d1a054] cursor-pointer py-3 w-full rounded-sm text-white font-bold"
            >
              Complete Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
