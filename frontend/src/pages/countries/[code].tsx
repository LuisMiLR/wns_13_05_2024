import { useRouter } from "next/router";
import { useCountryQuery } from "@/graphql/generated/schema";

export default function CountryDetails() {
  const router = useRouter();
  const code = router.query.code as string;

  const { data, loading, error } = useCountryQuery({
    variables: { code },
    skip: !code, // évite l'erreur si code est undefined
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  if (!data?.country) {
    return <p>No country found.</p>;
  }

  const { country } = data;

  return (
    <main className="flex flex-col items-center p-4">
      <div className="text-6xl m-8 emoji ">{country.emoji}</div>
      <h2 className="text-2xl font-bold mb-2">
        {country.name} ({country.code})
      </h2>
      {country.continent && <p className="text-lg" >Continent: {country.continent.name}</p>}
    </main>
  );
}
