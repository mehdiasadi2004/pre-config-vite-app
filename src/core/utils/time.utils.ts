import { useEffect, useState } from "react";

// ** Function for get the jalali date
export const getJalaliDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tehran",
    calendar: "persian",
    numberingSystem: "arab",
  };

  const formatter = Intl.DateTimeFormat("fa-IR", options);
  return formatter.format(date);
};

export const useCurrentTime = (): { time: string; date: string } => {
  // ** States
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  // ** Effects
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Tehran",
      };
      const formatter = Intl.DateTimeFormat("fa-IR", options);
      const timeString = formatter.format(now);
      setTime(timeString);

      // ** Jalali date
      const jalaliDate = getJalaliDate(now);

      setDate(jalaliDate);
    };

    // ** Update the time every minute
    const intervalId = setInterval(updateDateTime, 1000);

    updateDateTime();

    return () => clearInterval(intervalId);
  }, []);

  return { time, date };
};
