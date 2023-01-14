"use strict";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import SearchResults from "../components/SearchResults";
import SelectedTitle from "../components/SelectedTitle";
import { TfiSearch } from "react-icons/tfi";

export default function Movies() {
  // State Variables
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newString, setNewString] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectTitle, setSelectTitle] = useState({});
  const [locations, setLocations] = useState([]);

  // framerMotion Variables

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
      <Head></Head>
      <main className=" bg-darkgrey py-5 h-auto min-h-screen">
        <div className="w-full px-2 mx-auto">
          <h1 className=" font-poppins text-5xl font-light mb-5 text-offwhite">
            Media Search
          </h1>
          <p className="mb-3 text-offwhite ">
            Find where to watch TV shows or Movies across all streaming
            platforms
          </p>
          <form
            className="mb-5 flex items-center"
            onSubmit={(e) => {
              e.preventDefault();
              searchTitles();
            }}
            action=""
          >
            <input
              placeholder="Start typing..."
              className="border p-2 pl-4 rounded-tl-full rounded-bl-full w-5/6"
              type="text"
              id="search"
              onChange={(e) => handleInput(e)}
            />
            <button className=" w-1/6 bg-deepRed py-3 px-5  text-white text-xl rounded-tr-full rounded-br-full flex">
              <TfiSearch className="" />
            </button>
          </form>
          <SearchResults
            getTitle={getTitle}
            data={data}
            setIsOpen={setIsOpen}
            getLocations={getLocations}
          />
        </div>
        <SelectedTitle
          closeModal={closeModal}
          selectTitle={selectTitle}
          isOpen={isOpen}
          locations={locations}
        />
        {/* PopUp */}
      </main>
    </>
  );
}
