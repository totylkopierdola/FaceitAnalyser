/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, Fragment, useEffect } from "react";
import { Transition } from "@headlessui/react";
import { useTimeoutFn } from "react-use";
import BackgroundShapes from "../components/BackgroundShapes";

import { useRouter } from "next/router";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { usePlayerData } from "./hooks/PlayerDataContext";

const Home = () => {
  const router = useRouter();

  const { getSearchForPlayers, playerData } = usePlayerData();
  const [inputNickname, setInputNickname] = useState("shorstky");
  const [isShowing, setIsShowing] = useState(false);
  const [enterPage, setEnterPage] = useState(false);
  let [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 50);

  const handleInputChange = (event) => {
    setInputNickname(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    getSearchForPlayers(inputNickname);
    setIsShowing(false);
    setTimeout(() => {
      setIsShowing(true);
    }, 500);
    setInputNickname("");
  };

  useEffect(() => {
    setEnterPage(true);
  }, []);

  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      <BackgroundShapes color="bg-orange-500" opacity="opacity-20" />
      <Transition
        as={Fragment}
        show={enterPage}
        enter="transition-opacity duration-1000"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="mx-auto px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40 justify-center">
          <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
            <div className="mt-24 sm:mt-32 lg:mt-16">
              <Link href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
                  What&apos;s new
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-300">
                  <span>Just shipped v1.0</span>
                  <ChevronRightIcon
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Find player statistics
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              type the player&apos;s nickname and get the data
            </p>

            {/* input */}
            <form
              className="w-full max-w-md lg:col-span-5 lg:pt-2"
              onSubmit={handleSearch}
              name="search-form"
            >
              <div className="flex flex-col gap-x-4 ">
                <div className="input-container flex gap-2 mb-2">
                  <label className="sr-only">Email address</label>
                  <input
                    type="text"
                    placeholder="Enter player name"
                    value={inputNickname}
                    onChange={handleInputChange}
                    className="flex-1 rounded-md bg-gray-800 px-4 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 max-w-56"
                  />
                  <button
                    type="submit"
                    className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Search
                  </button>
                </div>
                <div className="search-results h-52 overflow-y-scroll overflow-x-hidden  max-w-80 no-scrollbar ">
                  {playerData.info.items &&
                    playerData.info.items.map((player, index) => (
                      <Transition
                        as={Fragment}
                        show={isShowing}
                        enter="transform transition duration-[300ms]"
                        enterFrom="opacity-0 scale-50"
                        enterTo="opacity-25 scale-100"
                        leave="transform duration-200 transition ease-in-out"
                        leaveFrom="opacity-25 scale-100"
                        leaveTo="opacity-0 scale-95"
                        key={index}
                      >
                        <div
                          className="bg-slate-50 opacity-10 flex align-center items-center  rounded-md px-2 cursor-pointer hover:bg-gray-200 transition-all ease-in-out duration-300 mt-2 hover:opacity-50 max-h-10"
                          key={index}
                          onClick={() => {
                            router.push(`/player-info/${player.nickname}`);
                          }}
                        >
                          <img
                            className="rounded-full p-2"
                            width="50"
                            height="50"
                            src={
                              player.avatar
                                ? player.avatar
                                : "https://static.thenounproject.com/png/55393-200.png"
                            }
                            alt={player.nickname}
                          />
                          <span>{player.nickname}</span>
                          <span className="ml-1">[{player.country}]</span>
                          <span>
                            {player.status === "AVAILABLE" ? (
                              <div className="bg-green-500 rounded-full w-2 h-2 mx-1"></div>
                            ) : (
                              <div className="bg-red-500 rounded-full w-2 h-2 mx-1"></div>
                            )}
                          </span>
                          <span>{player.verified}</span>
                        </div>
                      </Transition>
                    ))}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-gray-300">
                We care about your data. Read our{" "}
                <Link href="#" className="font-semibold text-white">
                  privacy&nbsp;policy
                </Link>
                .
              </p>
            </form>
          </div>
          {/* <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <img
              src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              alt="App screenshot"
              width={2432}
              height={1442}
              className="w-[76rem] rounded-md bg-white/5 shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div> */}
        </div>
      </Transition>
    </div>
  );
};

export default Home;
