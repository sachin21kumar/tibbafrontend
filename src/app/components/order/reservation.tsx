"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ReservationPage() {
  const router = useRouter();
  const params = useSearchParams();

  const initialDate = params.get("date") || "";
  const initialTime = params.get("time") || "";
  const initialGuests = params.get("guests") || "2";

  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [guests, setGuests] = useState(initialGuests);

  // generate last 5 slots in 15-min increments ending at selected time
  const generatePreviousSlots = (selectedTime: string) => {
    if (!selectedTime) return [];

    const match = selectedTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (!match) return [];

    let hour = parseInt(match[1]);
    const minute = parseInt(match[2]);
    const period = match[3].toUpperCase();

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const slots: string[] = [];
    for (let i = 4; i >= 0; i--) {
      let totalMinutes = hour * 60 + minute - i * 15;
      if (totalMinutes < 0) continue;

      let h = Math.floor(totalMinutes / 60);
      let m = totalMinutes % 60;
      const p = h >= 12 ? "PM" : "AM";
      const displayH = h % 12 === 0 ? 12 : h % 12;
      const displayM = m.toString().padStart(2, "0");
      slots.push(`${displayH}:${displayM} ${p}`);
    }
    return slots;
  };

  const goToDetails = () => {
    router.push(
      `/reservation/details?date=${date}&time=${time}&guests=${guests}`
    );
  };

  // Optional: generate time slots dynamically 9AM - 10PM
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
   
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-[16px] ">
      <div className="bg-white w-full max-w-[640px] pt-8 p-6 rounded-lg shadow">
        {/* Header */}
        <div className="mb-6 ">
          <div className="flex gap-4 justify-center text-sm text-[#d1a054] border-b border-b-[#d1a054] pb-3">
            <span className="flex items-center gap-2 text-red-600">
              <span className="w-5 h-5 rounded-full bg-[#d1a054] text-white flex items-center justify-center text-xs">
                1
              </span>
              Find a table
            </span>
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full border flex items-center justify-center text-xs">
                2
              </span>
              Add your details
            </span>
          </div>

          <h2 className="text-[24px] font-[system-ui] py-[19px] text-[#d1a054] font-bold border-b border-b-[#d1a054]">
            Reservation at Max Restaurant
          </h2>
        </div>

        {/* Editable Inputs */}
        <div className="grid grid-cols-3 mb-4 gap-2">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border border-[#d1a054] text-[#d1a054] px-3 py-3 text-sm"
          />
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border border-[#d1a054] text-[#d1a054] px-3 py-3 text-sm"
          >
            {generateTimeSlots().map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="border border-[#d1a054] text-[#d1a054] px-3 py-3 text-sm"
          >
            {Array.from({ length: 9 }, (_, i) => {
              const guest = i + 2;
              return (
                <option key={guest} value={guest}>
                  {guest} people
                </option>
              );
            })}
          </select>
        </div>

        <button
          className="w-full bg-[#d1a054] text-white py-3 rounded font-semibold mb-4 cursor-pointer"
          
        >
          Find a table
        </button>

        <div className="flex flex-wrap justify-between gap-2 mb-4">
          {generatePreviousSlots(time).map((t) => (
            <button
              key={t}
              className="bg-[#d1a054] text-white px-6 py-2 rounded text-sm"
              onClick={goToDetails}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="text-sm text-gray-600 mt-6">
          <div className="font-semibold flex items-center gap-2">
            <span className="w-3 h-3 bg-[#d1a054] rounded-full"></span>
            OpenTable
          </div>
          <span className="font-[system-ui]">
            Max Restaurant has partnered with OpenTable to provide free, secure,
            and instantly confirmed online reservations.
          </span>
          .<span className="text-[#d1a054] font-[system-ui]">Learn more</span>
        </div>
      </div>
    </div>
    </>
  );
}
