import { Forecastday } from "@/types";
import React from "react";

type Props = {
  item: Forecastday;
};

const ForecastDay = ({ item }: Props) => {
  return (
    <div className="flex justify-between items-center">
      <span className="font-semibold text-lg w-1/4">{`${item.date}`}</span>
      <img src={item.day.condition.icon} alt="Weather Icon" />
      <span className="font-semibold text-lg w-1/4 text-right">
        {item.day.mintemp_c}° / {item.day.maxtemp_c}°
      </span>
    </div>
  );
};

export default ForecastDay;
