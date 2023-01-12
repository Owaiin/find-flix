import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

export default function Movies() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newString, setNewString] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const imdbApiKey = process.env.IMDB_API_KEY;
  const rapidApiKey = process.env.RAPID_API_KEY;

  //
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id === "search") {
      setSearchQuery(value.replaceAll(" ", "_"));
    }
  };

  console.log("This is the search query: ", searchQuery);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host":
        "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
    },
  };

  const getData = async () => {
    const response = await fetch(
      `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${searchQuery}&country=uk`,
      options
    );
    const newData = await response.json();
    setData(newData.results);
    console.log("newData.Results: ", newData.results);
  };

  // useEffect(() => {
  //   getData();
  //   console.log(data);
  //   console.log(data.results);
  // }, []);

  return (
    <>
      <div className="w-5/6 mx-auto mt-5">
        <h1 className=" text-2xl font-bold">Movies</h1>
        <button className=" border mx -2" onClick={() => console.log(data)}>
          Log Data
        </button>
        <button onClick={() => console.log(searchQuery)}>
          Console Log Data
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getData();
            console.log("submit data log: ", data);
          }}
          action=""
        >
          <label htmlFor="search">Search</label>
          <input
            className="border"
            type="text"
            id="search"
            onChange={(e) => handleInput(e)}
          />
          <button className="bg-slate-400 py-2 px-5 m-2">Search</button>
        </form>
        <div>
          <ul>
            {data.map((object, index) => {
              return (
                <li key={index}>
                  <Image
                    loading="eager"
                    src={object.picture}
                    width={300}
                    height={300}
                    quality={75}
                    alt={`Poster for ${object.name}`}
                  />
                  <p className=" font-bold">{object.name}</p>
                  <p>{object.external_ids.imdb.id}</p>
                  <button className=" bg-slate-500 py-2 px-4 rounded-md text-white">
                    More info
                  </button>
                  <ul>
                    {object.locations.map((location, locindex) => {
                      return (
                        <li className="ml-2" key={locindex}>
                          <p className=" font-medium text-slate-500">
                            {location.display_name}
                          </p>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
