"use client";

import Forecast from "@/components/forecast";
import { Weather } from "@/types";
import { useState } from "react";

export default function Home() {
  const [inputSearch, setInputSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: "" });
  const [data, setData] = useState<Weather | null>(null);

  const BASE_URL = "https://api.weatherapi.com/v1/";
  const WEATHER_API_KEY = "ff9b41622f994b1287a73535210809";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputSearch === "") return;

    setIsLoading(true);
    setError({ status: false, message: "" });

    fetch(
      `${BASE_URL}forecast.json?key=${WEATHER_API_KEY}&q=${inputSearch}&days=5`
    )
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setError({ status: true, message: res.error.message });
        } else {
          setData(res);
        }
      })
      .catch(error => {
        console.log(error);
        setError({
          status: true,
          message: "Hubo un error al procesar la solicitud.",
        });
      })
      .finally(() => {
        setIsLoading(false);
        setInputSearch("");
      });
  };

  return (
    <main className="flex flex-col items-center justify-center w-100 min-h-screen text-gray-700 p-10 bg-gradient-to-br from-pink-200 via-purple-200 to-indigo-200 ">
      <form onSubmit={onSubmit} className="flex gap-3">
        <input
          type="text"
          value={inputSearch}
          onChange={e => setInputSearch(e.target.value.trim())}
          placeholder="Monterrey"
          className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm max-w-[220px]"
        />
        <button className="px-6 py-3 text-white bg-cyan-600 border border-gray-200 rounded-full transition-opacity hover:opacity-80">
          {isLoading ? "Buscando" : "Buscar"}
        </button>
      </form>
      {isLoading && !error.status && (
        <strong className="mt-10">Cargando</strong>
      )}
      {error.status && <strong className="mt-10">{error.message}</strong>}
      {!data && !isLoading && !error.status && (
        <strong className="mt-10">Busca el clima en tu ciudad</strong>
      )}
      {data && !error.status && (
        <>
          <div className="w-full max-w-screen-sm bg-white p-10 rounded-xl ring-8 mt-10 ring-white ring-opacity-40">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="text-6xl font-bold">
                  {data.current.temp_c}°C
                </span>
                <span className="font-semibold mt-1 text-gray-500">
                  {data.location.name}
                </span>
              </div>
              <img
                src={data.current.condition.icon}
                alt="Condition Icon"
                className="w-100 object-contain h-auto"
              />
            </div>
          </div>
          <Forecast data={data} />
        </>
      )}
    </main>
  );
}
