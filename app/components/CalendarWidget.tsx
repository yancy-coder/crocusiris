"use client";

import { useState, useEffect } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { zhCN } from "date-fns/locale/zh-CN";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";

export function CalendarWidget() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const calendarStart = startOfWeek(monthStart, { locale: zhCN });
  const calendarEnd = endOfWeek(monthEnd, { locale: zhCN });

  const days: Date[] = [];
  let day = calendarStart;
  while (day <= calendarEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  const weekDays = ["日", "一", "二", "三", "四", "五", "六"];

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-amber-400" />
          <span className="text-white font-medium">日历</span>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-white">
            {format(currentTime, "HH:mm")}
          </div>
          <div className="text-xs text-white/60">
            {format(currentTime, "yyyy年MM月dd日 EEEE", { locale: zhCN })}
          </div>
        </div>
      </div>

      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={prevMonth}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-white/70" />
        </button>
        <span className="text-white font-medium">
          {format(currentDate, "yyyy年 MM月", { locale: zhCN })}
        </span>
        <button
          onClick={nextMonth}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-white/70" />
        </button>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((d) => (
          <div key={d} className="text-center text-xs text-white/50 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, idx) => {
          const isCurrentMonth = isSameMonth(date, currentDate);
          const isToday = isSameDay(date, new Date());
          const isSelected = isSameDay(date, selectedDate);

          return (
            <button
              key={idx}
              onClick={() => setSelectedDate(date)}
              className={`
                aspect-square rounded-lg text-sm flex items-center justify-center
                transition-all duration-200
                ${!isCurrentMonth ? "text-white/20" : "text-white/80"}
                ${isToday ? "bg-amber-500/80 text-white font-bold" : ""}
                ${isSelected && !isToday ? "bg-white/20 text-white" : ""}
                ${isCurrentMonth && !isToday && !isSelected ? "hover:bg-white/10" : ""}
              `}
            >
              {format(date, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}
