import { GetStaticProps, GetStaticPaths } from "next";
import Image from "next/image";

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
    other: { "official-artwork": { front_default: string } };
  };
  types: { type: { name: string } }[];
  abilities: { ability: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  weight: number;
  height: number;
  base_experience: number;
}

const typeColors: { [key: string]: string } = {
  fire: "from-red-500 to-orange-500",
  water: "from-blue-500 to-indigo-500",
  grass: "from-green-500 to-lime-500",
  electric: "from-yellow-500 to-orange-400",
  psychic: "from-pink-500 to-purple-500",
  ice: "from-teal-300 to-blue-300",
  dragon: "from-indigo-600 to-purple-700",
  dark: "from-gray-800 to-black",
  fairy: "from-pink-400 to-pink-600",
  normal: "from-gray-400 to-gray-600",
  fighting: "from-red-700 to-orange-700",
  flying: "from-blue-300 to-indigo-400",
  poison: "from-purple-500 to-purple-700",
  ground: "from-yellow-700 to-brown-600",
  rock: "from-gray-600 to-gray-800",
  bug: "from-lime-500 to-green-600",
  ghost: "from-indigo-700 to-gray-900",
  steel: "from-gray-500 to-gray-700",
};

export default function PokemonDetail({ pokemon }: { pokemon: Pokemon }) {
  const mainType = pokemon.types[0]?.type.name || "normal";
  const bgGradient = typeColors[mainType] || "from-gray-500 to-gray-700";

  return (
    <div
      className={`bg-gradient-to-b ${bgGradient} min-h-screen text-white p-6 flex flex-col items-center`}
    >
      <h1 className="text-5xl font-bold text-center mb-6 capitalize text-yellow-400">
        {pokemon.name}
      </h1>

      <div className="relative w-64 h-64 mb-6">
        <Image
          src={
            pokemon.sprites.other["official-artwork"].front_default ||
            pokemon.sprites.front_default
          }
          alt={pokemon.name}
          layout="fill"
          objectFit="contain"
          className="drop-shadow-2xl"
        />
      </div>

      {/* Pokémon Info */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
        <p className="text-lg mb-2">
          <strong>Type:</strong>{" "}
          <span className="text-yellow-400">
            {pokemon.types.map((t) => t.type.name).join(", ")}
          </span>
        </p>
        <p className="text-lg mb-2">
          <strong>Abilities:</strong>{" "}
          <span className="text-yellow-400">
            {pokemon.abilities.map((a) => a.ability.name).join(", ")}
          </span>
        </p>
        <p className="text-lg mb-2">
          <strong>Height:</strong> {pokemon.height / 10} m
        </p>
        <p className="text-lg mb-2">
          <strong>Weight:</strong> {pokemon.weight / 10} kg
        </p>
        <p className="text-lg mb-2">
          <strong>Base Experience:</strong> {pokemon.base_experience}
        </p>

        <p className="text-lg mb-2 font-bold mt-4">Stats:</p>
        <ul className="text-gray-300">
          {pokemon.stats.map((s) => (
            <li key={s.stat.name} className="flex justify-between">
              <span className="capitalize">{s.stat.name}:</span>
              <span className="font-bold text-yellow-400">{s.base_stat}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
  const data = await res.json();

  const paths = data.results.map((_: { name: string }, index: number) => ({
    params: { id: (index + 1).toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params?.id}`);

  if (!res.ok) {
    return { notFound: true };
  }

  const pokemon: Pokemon = await res.json();
  return { props: { pokemon } };
};
