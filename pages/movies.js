import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";

export default function Movies() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newString, setNewString] = useState("");
  const [isOpen, setIsOpen] = useState(true);
  const [selectTitle, setSelectTitle] = useState(null);
  const [locations, setLocations] = useState(null);

  let i = 0;
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
  // UTelly API - General Search Term START
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host":
        "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
    },
  };

  const getLocations = async (id) => {
    const response = await fetch(
      `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=${id}&source=imdb&country=uk`,
      options
    );
    const data = await response.json();
    const locations = await data.collection.locations;
    console.log(data.collection);
    console.log(data.collection.locations);
  };

  // const getData = async () => {
  //   const response = await fetch(
  //     `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=${searchQuery}&country=uk`,
  //     options
  //   );
  //   const newData = await response.json();
  //   setData(newData.results);
  //   console.log("newData.Results: ", newData.results);
  // };
  // UTelly API - General Search Term END

  // UTELLY API - SEARCH BY ID

  // IMDb API Search Query
  const searchTitles = async () => {
    const response = await fetch(
      `https://imdb-api.com/en/API/SearchTitle/k_j3pm45ri/${searchQuery}`
    );
    const titles = await response.json();
    console.log("Titles function data:", titles.results);
    let resultsImages = [];
    let resultsLocations = [];
    for (i = 0; i < titles.results.length; i++) {
      if (titles.results[i].image != "") resultsImages.push(titles.results[i]);
      resultsLocations.push(titles.results[i].id);
    }
    setLocations(resultsLocations);
    setData(resultsImages);
  };

  // IMDb API SEARCH BY ID
  const getTitle = async (id) => {
    const response = await fetch(
      `https://imdb-api.com/en/API/Title/k_j3pm45ri/${id}`
    );
    const title = await response.json();
    console.log(title);
    setSelectTitle(title);
  };

  //

  // useEffect(() => {
  //   getData();
  //   console.log(data);
  //   console.log(data.results);
  // }, []);

  return (
    <>
      <div className="w-5/6 mx-auto mt-5">
        <h1 className=" text-2xl font-bold">Movies</h1>
        <button
          className=" border mx -2"
          onClick={() => console.log(locations)}
        >
          Log Locations
        </button>
        <button
          className=" border mx-2 py-2 px-3"
          onClick={() => {
            searchTitles();
          }}
        >
          Get IMDB Data
        </button>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            searchTitles();
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
          <div className="grid grid-cols-4 gap-5  w-full">
            {data.map((object, index) => {
              return (
                <div
                  className=" min-h-fit flex flex-col justify-between "
                  key={index}
                >
                  <Image
                    loading="eager"
                    src={object.image}
                    width={300}
                    height={300}
                    quality={25}
                    className=" rounded-2xl h-3/4 object-cover"
                    alt={`Poster for ${object.title}`}
                  />
                  <div>
                    <p className=" font-bold text-xl">{object.title}</p>
                    <p className="mb-2 ">{object.description}</p>
                    {locations.map((location, index) => {
                      return (
                        <div key={index}>
                          <p>{location.display_name}</p>
                        </div>
                      );
                    })}

                    <button className=" bg-slate-500 py-2 px-4 rounded-md text-white">
                      More info
                    </button>
                  </div>

                  <ul>
                    {/* {object.locations.map((location, locindex) => {
                      return (
                        <li className="ml-2" key={locindex}>
                          <p className=" font-medium text-slate-500">
                            {location.display_name}
                          </p>
                        </li>
                      );
                    })} */}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
