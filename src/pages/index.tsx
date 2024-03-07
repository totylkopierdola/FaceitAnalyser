/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useRouter } from "next/router";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { usePlayerData } from "./hooks/PlayerDataContext";

const Home = () => {
  const router = useRouter();
  const { getSearchForPlayers, playerData } = usePlayerData();
  const [inputNickname, setInputNickname] = useState("shorstky");

  const handleInputChange = (event) => {
    setInputNickname(event.target.value);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    getSearchForPlayers(inputNickname);
  };

  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="50%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg>
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <img
            className="h-11"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
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
            </a>
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
              <div className="search-results h-52 overflow-y-scroll overflow-x-hidden  max-w-80 no-scrollbar">
                {playerData.info.items &&
                  playerData.info.items.map((player, index) => (
                    <div
                      className="bg-slate-50 opacity-10 flex align-center items-center border border-black rounded-md px-2 cursor-pointer hover:bg-gray-200 transition-all ease-in-out duration-300 mt-2 hover:opacity-50 max-h-10"
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
                  ))}
              </div>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-300">
              We care about your data. Read our{" "}
              <a href="#" className="font-semibold text-white">
                privacy&nbsp;policy
              </a>
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
    </div>
  );
};

export default Home;
