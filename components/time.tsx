import React, { useEffect, useState } from "react";

interface LocalTimeProps {
  date: Date | string | number;
}

const LocalTime: React.FC<LocalTimeProps> = ({ date }) => {
  const [localTime, setLocalTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof date === "number") {
      setLocalTime(new Date(date).toLocaleTimeString());
    } else if (typeof date === "string") {
      setLocalTime(new Date(date).toLocaleTimeString());
    } else if (date instanceof Date) {
      setLocalTime(date.toLocaleTimeString());
    }
  }, [date]);

  return <>{localTime}</>;
};

export default LocalTime;
