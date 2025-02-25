"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await res.json();
      setPokemons(data.results);
    }
    fetchData();
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen text-white p-6">
      <h1 className="text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
        Pokemon Explorer
      </h1>

      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search Pokémon..."
          className="w-full max-w-md p-3 text-black rounded-lg shadow-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {pokemons
          .filter((poke) => poke.name.includes(search))
          .map((poke, index) => (
            <Link key={poke.name} href={`/pokemon/${index + 1}`} className="group">
              <Card className="bg-gray-800 p-5 rounded-2xl text-center shadow-lg transition duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-700">
                <CardContent className="flex flex-col items-center">
                  <div className="bg-gray-900 p-3 rounded-full">
                    <Image
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`}
                      alt={poke.name}
                      width={120}
                      height={120}
                      className="object-contain drop-shadow-lg"
                    />
                  </div>
                  <p className="capitalize text-lg mt-3 font-semibold group-hover:text-yellow-400">
                    {poke.name}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
      </div>
    </div>
  );
}
