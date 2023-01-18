"use strict";
import Head from "next/head";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import SearchResults from "../components/SearchResults";
import SelectedTitle from "../components/SelectedTitle";
import { TfiSearch } from "react-icons/tfi";
import loadingSpinner from "../public/Eclipse-1s-200px.svg";
import {
  SiGooglecast,
  SiGoogleplay,
  SiAppletv,
  SiAmazonprime,
  SiYoutube,
  SiNetflix,
} from "react-icons/si";
import dynamic from "next/dynamic";
import Container from "../components/Container";
import Footer from "../components/Footer";
import disneyLogo from "../public/disneyPlusLogo.svg";

const selectedTitleDy = dynamic(() => import("../components/SelectedTitle"));
const searchResultsDy = dynamic(() => import("../components/SearchResults"));

export default function Movies() {
  // State Variables
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newString, setNewString] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectTitle, setSelectTitle] = useState({});
  const [locations, setLocations] = useState([]);
  const [relatedTitles, setRelatedTitles] = useState();
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
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
      if (titles.results[i].image != "" || !titles.results[i].title)
        resultsImages.push(titles.results[i]);
      // resultsLocations.push(titles.results[i].id);
    }
    // setLocations(resultsLocations);
    setData(resultsImages);
    setIsLoading(false);
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
      <Head>
      <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-34JY2P0FFR"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-34JY2P0FFR');
</script>
        <title>
          Find where TV Shows and Movies across all Streaming Platforms in one
          place | FindFlix
        </title>
        <meta
          name="description"
          content="Find all your TV Shows and Movies across all streaming platforms and even filter by country!"
          key="desc"
        />
        <meta
          property="og:Title"
          content="Find TV Shows and Movies on all Platforms with FindFlix"
        />
      </Head>
      <main className=" bg-darkgrey py-5 h-auto min-h-screen">
        <Container>
          <div className="w-full mx-auto">
            <div className="2xl:w-1/4 xl:w-1/2 md:3/4">
              <h1 className=" font-poppins text-5xl font-light mb-3 text-offwhite tracking-widest text-center xl:text-start">
                FIND-FLIX
              </h1>
              <p className="mb-3 text-offwhite font-poppins text-center xl:text-start">
                Find where to watch TV shows or Movies across all streaming
                platforms
              </p>
              <form
                className="mb-5 h-12 flex items-center"
                onSubmit={(e) => {
                  e.preventDefault();
                  searchTitles();
                }}
                action=""
              >
                <input
                  placeholder="Start typing..."
                  className="border p-2 pl-4 h-full rounded-tl-full text-darkgrey rounded-bl-full w-5/6"
                  type="text"
                  id="search"
                  onChange={(e) => handleInput(e)}
                />
                <button
                  aria-label="search"
                  alt="search"
                  className=" w-1/6 bg-deepRed h-full text-white text-xl rounded-tr-full rounded-br-full flex flex-col items-center justify-center"
                >
                  {isLoading ? (
                    <Image
                      id="loading-spinner"
                      src={loadingSpinner}
                      width={100}
                      height={100}
                      quality={100}
                      className=" h-3/4 w-full"
                      alt="animation for loading results"
                    />
                  ) : (
                    <TfiSearch id="search-icon" className="" />
                  )}
                </button>
              </form>
            </div>
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
            SiNetflix
            isOpen={isOpen}
            locations={locations}
            getTitle={getTitle}
            setIsOpen={setIsOpen}
            getLocations={getLocations}
          />
        </Container>

        <Container>
          <div className="grid xl:grid-cols-3 w-full gap-10 xl:gap-24 my-10 xl:mt-20 text-center">
            <div className=" w-full h-full flex flex-col items-center justify-end">
              <TfiSearch className="h-20 w-full mb-3" />
              <h2 className="font-poppins text-xl uppercase tracking-wide mb-3">
                Step 1: Search for your TV Show or Movie
              </h2>
              <p>
                Just use the search bar at the top to find whatever you're
                looking for, and then tap result you're looking for!
              </p>
            </div>
            <div className=" w-full h-full">
              <div className="grid grid-cols-6 h-40 items-center pb-2 px-2 end">
                <SiAmazonprime className="w-full h-full col-span-3" />
                <Image
                  src={disneyLogo}
                  alt="Disney Plus Logo"
                  width={100}
                  height={100}
                  className="filter invert w-full h-16 col-span-3"
                />
                <SiAppletv className="w-full h-16 col-span-2" />
                <SiGoogleplay className="w-full h-10 col-span-2" />
                <SiNetflix className="w-full h-10 col-span-2" />
              </div>
              <h2 className="font-poppins text-xl uppercase tracking-wide mb-3">
                Step 2: Select a streaming platform to watch on
              </h2>
              <p>
                Not only do we show you the platforms your show is available
                one, you can click the icon to be taken directly to it!
              </p>
            </div>
            <div className=" w-full h-full flex flex-col items-center justify-end">
              <SiGooglecast className="text-7xl ml-2 mb-3" />
              <h2 className="font-poppins text-xl uppercase tracking-wide mb-2">
                Step 3: Cast from your phone to your device!
              </h2>
              <p>
                If you're using your phone, you can usually cast to your
                SmartTV, ChromeCast, FireStick, Xbox, Playstation, Roku,
                AppleTV!
              </p>
            </div>
          </div>
        </Container>
        {/* PopUp */}
      </main>
      <Footer />
    </>
  );
}
