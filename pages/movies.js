"use strict";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Movies() {
  // State Variables
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newString, setNewString] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectTitle, setSelectTitle] = useState({});
  const [locations, setLocations] = useState([]);

  // framerMotion Variables
  const framerContainer = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const framerItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  let i = 0;
  const imdbApiKey = process.env.IMDB_API_KEY;
  const rapidApiKey = process.env.RAPID_API_KEY;

  //Change state of search query from search input and switch ' ' for '_'
  const handleInput = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id === "search") {
      setSearchQuery(value.replaceAll(" ", "_"));
    }
  };

  console.log("This is the search query: ", searchQuery);
  // UTelly API - Resquest Options - API Key and Host location
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": rapidApiKey,
      "X-RapidAPI-Host":
        "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
    },
  };

  // Close Modal Function - Clears selectTitle and location
  const closeModal = () => {
    setIsOpen(false);
    setSelectTitle({});
    setLocations([]);
  };

  // Get Selected Title Watch Locations - Param = selectedTitle.id
  const getLocations = async (id) => {
    const response = await fetch(
      `https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=${id}&source=imdb&country=uk`,
      options
    );
    const data = await response.json();
    const locations = await data.collection.locations;
    setLocations(locations);
  };

  // UTELLY API - SEARCH BY ID

  // IMDb API Search Query
  const searchTitles = async () => {
    setData([]);
    const response = await fetch(
      `https://imdb-api.com/en/API/SearchTitle/${imdbApiKey}/${searchQuery}`
    );
    const titles = await response.json();
    console.log("Titles function data:", titles.results);
    let resultsImages = [];
    // let resultsLocations = [];
    // Only responses with an image added to results
    for (i = 0; i < titles.results.length; i++) {
      if (titles.results[i].image != "") resultsImages.push(titles.results[i]);
      // resultsLocations.push(titles.results[i].id);
    }
    // setLocations(resultsLocations);
    setData(resultsImages);
  };

  // IMDb API SEARCH BY ID
  const getTitle = async (id) => {
    const response = await fetch(
      `https://imdb-api.com/en/API/Title/${imdbApiKey}/${id}`
    );
    const title = await response.json();
    console.log(title);
    setSelectTitle(title);
  };

  return (
    <>
      <main className=" bg-slate-200 py-5 h-auto min-h-screen">
        <div className="w-5/6 mx-auto">
          <h1 className=" text-5xl font-bold mb-5 text-slate-500">
            Media Search
          </h1>
          <p className="mb-3">
            Find where to watch TV shows or Movies across all streaming
            platforms
          </p>

          <form
            className="mb-5"
            onSubmit={(e) => {
              e.preventDefault();
              searchTitles();
            }}
            action=""
          >
            <input
              placeholder="Start typing..."
              className="border p-2 pl-4 rounded-2xl"
              type="text"
              id="search"
              onChange={(e) => handleInput(e)}
            />
            <button className="bg-slate-400 py-2 px-5 rounded-2xl my-2 ml-2 text-white font-medium">
              Search
            </button>
          </form>
          <div>
            <AnimatePresence>
              <motion.div
                variants={framerContainer}
                initial="hidden"
                animate="visible"
                className="grid md:grid-cols-4 grid-cols-1 gap-6  w-full"
              >
                {data.map((object, index) => {
                  return (
                    <motion.div
                      variants={framerItem}
                      className=" min-h-fit flex flex-col justify-between bg-white p-4 rounded-2xl shadow-2xl"
                      key={index}
                      exit={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      // animate={{ opacity: 1 }}
                      initial="hidden"
                      viewport={{ once: true }}
                    >
                      <Image
                        loading="eager"
                        src={object.image}
                        width={300}
                        height={300}
                        quality={25}
                        className=" rounded-2xl h-3/4 object-cover w-full"
                        alt={`Poster for ${object.title}`}
                      />
                      <div>
                        <p className=" font-bold text-xl">{object.title}</p>
                        <p className="mb-2 ">{object.description}</p>

                        <button
                          onClick={() => {
                            getTitle(object.id);
                            setIsOpen(true);
                            getLocations(object.id);
                          }}
                          className=" bg-slate-500 py-2 px-4 rounded-2xl font-medium text-white"
                        >
                          More info
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <Dialog
          className="relative z-50"
          open={isOpen}
          onClose={() => closeModal()}
        >
          {/* Center the modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=" fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-80"
          >
            <Dialog.Panel className="w-auto max-w-5xl rounded-2xl bg-white p-5 h-full relative">
              <button
                onClick={() => closeModal()}
                className="font-bold text-2xl absolute top-2 right-4 text-slate-500 z-30"
              >
                X
              </button>
              <div className="h-full w-full overflow-y-auto">
                <Image
                  loading="eager"
                  src={selectTitle.image}
                  width={300}
                  height={300}
                  quality={100}
                  className=" w-full h-full absolute rounded-2xl top-0 left-0 object-top object-cover blur-sm"
                  alt={`Poster for ${selectTitle.title}`}
                />
                <div className="bg-white w-full h-full absolute top-0 left-0 rounded-2xl opacity-80 z-10"></div>
                <Dialog.Title className="md:text-5xl text-3xl font-bold relative z-20 mb-5">
                  {selectTitle.title}
                </Dialog.Title>
                <Dialog.Description className="relative z-20">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div className="">
                      <Image
                        loading="eager"
                        src={selectTitle.image}
                        width={300}
                        height={300}
                        quality={100}
                        className="md:w-11/12 w-full h-auto rounded-2xl object-cover mb-5"
                        alt={`Poster for ${selectTitle.title}`}
                      />
                      {/* Watch Locations START*/}
                      <p className=" text-lg text-slate-500 font-medium">
                        Watch locations
                      </p>
                      <ul className="w-full grid grid-cols-4 gap-5 items-end">
                        {locations
                          ? locations.map((location, index) => {
                              return (
                                <>
                                  <li key={index}>
                                    <a
                                      key={index}
                                      target="_blank"
                                      href={location.url}
                                    >
                                      <Image
                                        className=""
                                        height={50}
                                        width={100}
                                        quality={25}
                                        alt={`Icon for ${location.display_name}`}
                                        src={location.icon}
                                      />
                                    </a>
                                  </li>
                                </>
                              );
                            })
                          : "No Streaming Services Found :("}
                      </ul>
                      {/* WATCH LOCATIONS END */}
                    </div>
                    <div>
                      <p className=" text-slate-500 font-semibold">
                        {selectTitle.year}{" "}
                        {!selectTitle.tvSeriesInfo ||
                        selectTitle.tvSeriesInfo.yearEnd === ""
                          ? ""
                          : `- ${selectTitle.tvSeriesInfo.yearEnd}`}
                      </p>
                      <p className="text-slate-500 font-medium">
                        {!selectTitle.directors
                          ? ""
                          : `Directed by: ${selectTitle.directors}`}
                      </p>
                      <p>{selectTitle.plot}</p>
                      <button
                        onClick={() => {
                          console.log(selectTitle), console.log(locations);
                        }}
                      >
                        Log selectTitle
                      </button>

                      {/* Cast Start */}
                      <p className=" text-slate-500 font-medium mb-2 text-lg">
                        Cast
                      </p>
                      <ul className="grid grid-cols-4 gap-2 h-1/3 md:overflow-y-auto">
                        {!selectTitle.actorList || selectTitle.actorList === []
                          ? "No Cast Found"
                          : selectTitle.actorList.map((cast, index) => {
                              return (
                                <>
                                  <li key={index}>
                                    <Image
                                      width={100}
                                      height={100}
                                      src={cast.image}
                                      quality={25}
                                      className="object-cover h-28 rounded-md"
                                    />
                                    <p className="text-sm">{cast.name}</p>
                                    <p className="text-xs">
                                      {cast.asCharacter}
                                    </p>
                                  </li>
                                </>
                              );
                            })}
                      </ul>
                    </div>

                    {/* End of grid below */}
                  </div>
                </Dialog.Description>
              </div>
            </Dialog.Panel>
          </motion.div>
        </Dialog>
      </main>
    </>
  );
}
