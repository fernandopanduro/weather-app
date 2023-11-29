import React from "react";
import ForecastDay from "./forecast-day";
import { Weather } from "@/types";

type Props = {
  data: Weather;
};

const Forecast = ({ data }: Props) => {
  return (
    <div className="flex flex-col space-y-6 w-full max-w-screen-sm bg-white p-10 mt-10 rounded-xl ring-8 ring-white ring-opacity-40">
      {data.forecast.forecastday.map((item, index) => (
        <ForecastDay item={item} key={index} />
      ))}
    </div>
  );
};

export default Forecast;
