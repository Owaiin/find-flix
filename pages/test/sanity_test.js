import { createClient } from "next-sanity";

export default function TestPage({ pets }) {
  return (
    <>
      <header>
        <h1>Sanity + Next.js</h1>
      </header>
      <main>
        <h2>pets</h2>
        {pets.length > 0 && (
          <ul>
            {pets.map((pet) => (
              <li key={pet._id}>{pet?.name}</li>
            ))}
          </ul>
        )}
        {!pets.length > 0 && <p>No pets to show</p>}
        {pets.length > 0 && (
          <div>
            <pre>{JSON.stringify(pets, null, 2)}</pre>
          </div>
        )}
        {!pets.length > 0 && (
          <div>
            <div>¯\_(ツ)_/¯</div>
            <p>
              Your data will show up here when you've configured everything
              correctly
            </p>
          </div>
        )}
      </main>
    </>
  );
}

// Configure client - connect to content lake ProjectID and DataSet
const client = createClient({
  projectId: "du10ux2s",
  dataset: "production",
  apiVersion: "2023-01-14",
  useCdn: false,
});

// Query the database for pets and return them as props inside of pets
export async function getStaticProps() {
  const pets = await client.fetch(`*[_type == "pet"]`);
  return {
    props: {
      pets,
    },
  };
}
