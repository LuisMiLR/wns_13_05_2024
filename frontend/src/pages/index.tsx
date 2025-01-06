// pages/countries/index.tsx
import Link from "next/link"; // Importer le composant Link pour la navigation
import { useCountriesQuery, useAddCountryMutation } from "@/graphql/generated/schema";
import { useState } from "react";

export default function CountriesPage() {
  const { data, loading, error, refetch } = useCountriesQuery();
  const [addCountry, { loading: adding }] = useAddCountryMutation();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [emoji, setEmoji] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addCountry({
        variables: {
          data: { name, code, emoji },
        },
      });
      await refetch();

      setName("");
      setCode("");
      setEmoji("");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading countries...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="p-4">

      <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded-md shadow-md mb-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 rounded w-full md:w-auto flex-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Code"
          className="border p-2 rounded w-full md:w-auto flex-1"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <input
          type="text"
          placeholder="Emoji"
          className="border p-2 rounded w-full md:w-auto flex-1"
          value={emoji}
          onChange={(e) => setEmoji(e.target.value)}
        />
        <button
          type="submit"
          className="bg-red-500 text-white py-2 px-4 rounded shadow-md"
          disabled={adding}
        >
          {adding ? "Adding..." : "Add Country"}
        </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data?.countries?.map((c) => (
          <Link
            key={c.code}
            href={`/countries/${c.code}`}
            className="border p-4 rounded-md shadow-md flex flex-col items-center"
          >
            <span className=" emoji text-3xl mb-2">{c.emoji}</span>
            <h3 className="font-bold mb-1">{c.name}</h3>
            <p className="text-gray-500">({c.code})</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
