import Link from "next/link";
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
    <main className="p-4 flex flex-col justify-center items-center">

      <form onSubmit={handleSubmit} className=" border border-slate-200 bg-gray-50 max-w-6xl items-center p-4 rounded-md shadow-md mb-8 ">
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
          className="bg-pink-600 text-white py-2 px-4 rounded shadow-md"
          disabled={adding}
        >
          {adding ? "Adding..." : "Add"}
        </button>
        </div>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
      lg:grid-cols-6 gap-4 max-w-2xl ">
        {data?.countries?.map((c) => (
          <Link
            key={c.code}
            href={`/countries/${c.code}`}
            className="border  border-slate-200 text-gray-600 px-3 py-1 rounded-md shadow-md flex flex-col items-center"
          >
            <h3 className="font-medium ">{c.name}</h3>
            <span className=" font-emoji text-3xl mb-2">{c.emoji}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
