"use client";
import Select from "react-select";
import clsx from "clsx";

import { useCallback, useEffect, useState } from "react";
import CountryLoader from "./CountryLoader";
import Country from "./Country";
import InfiniteScroll from "react-infinite-scroll-component";

const options: any = [
  { value: "Africa", label: "Africa" },
  { value: "Americas", label: "Americas" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
];
const HomeMain = () => {
  const [countries, setCountries] = useState<{
    data: any[];
    total: number;
    limit: number;
    skip: number;
  }>({
    data: [],
    total: 0,
    limit: 0,
    skip: 0,
  });

  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<{ search: string; region: any }>({
    search: "",
    region: null,
  });

  const getCountries = async (skip = 0) => {
    setLoading(true);
    const res = await fetch(
      `https://frontend-mentor-apis-6efy.onrender.com/countries?limit=8&skip=${skip}&search=${
        filter.search
      }&region=${filter.region?.value || ""}`
    );
    const data = await res.json();

    setCountries({
      ...countries,
      data: skip > 0 ? [...countries.data, ...data.data] : data.data,
      total: data.total,
    });

    setLoading(false);
  };

  useEffect(() => {
    setCountries({
      ...countries,
      data: [],
    });
    getCountries();
  }, [filter]);

  const loadMoreCountries = () => {
    getCountries(countries.skip + 8);
  };
  return (
    <main className="pt-12 bg-body-light dark:bg-body-dark min-h-[calc(100%_-_80px)]">
      <div className="container px-4 sm:px-0 mx-auto">
        {/* Search and filter part */}
        <section className="flex flex-col gap-10 md:flex-row justify-between mb-12">
          <div className="relative  rounded-x/2 w-full max-w-[480px] shadow-[0px_2px_9px_0px_rgba(0,0,0,0.05)]  text-sm ">
            <div className="absolute left-8 top-1/2 -translate-y-1/2 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  className="fill-[#848484] dark:fill-white"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.5 11H11.7L11.4 10.7C12.4 9.6 13 8.1 13 6.5C13 2.9 10.1 0 6.5 0C2.9 0 0 2.9 0 6.5C0 10.1 2.9 13 6.5 13C8.1 13 9.6 12.4 10.7 11.4L11 11.7V12.5L16 17.5L17.5 16L12.5 11ZM6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5C11 9 9 11 6.5 11Z"
                />
              </svg>
            </div>
            <input
              onChange={e =>
                setFilter({
                  ...filter,
                  search: e.target.value,
                })
              }
              value={filter.search}
              className="h-full dark:bg-header-dark dark:text-white w-full pl-[74px] py-[14px] rounded-x/2"
              type="text"
              placeholder="Search for a country..."
            />
          </div>

          <Select
            value={filter.region}
            onChange={newValue => {
              setFilter({
                ...filter,
                region: newValue,
              });
            }}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                border: "none",
                width: 200,
                paddingLeft: "1.5rem",
                height: 47,
                fontSize: "14px",
                lineHeight: "20px",

                borderRadius: "5px",
                paddingRight: "10px",
                boxShadow: "0px 2px 9px 0px rgba(0, 0, 0, 0.05)",
              }),

              indicatorSeparator: (baseStyles, state) => ({
                display: "none",
              }),

              indicatorsContainer: (baseStyles, state) => ({
                ...baseStyles,
                paddingLeft: 10,
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                paddingLeft: 24,
                fontSize: 14,
              }),
              menu: (baseStyles, state) => ({
                position: "absolute",
                width: "100%",
                top: 59,
                paddingTop: 8,
                borderRadius: 5,
                background: "white",
              }),
            }}
            classNames={{
              control: state => clsx(["dark:!bg-header-dark"]),
              menu: () => clsx("dark:!bg-header-dark", "dark:!text-white"),
              input: () => clsx("dark:!text-white"),

              singleValue: () => clsx("dark:!text-white"),
              option: state =>
                state.isFocused ? clsx("dark:!bg-blue-300") : "",
            }}
            isClearable
            placeholder="Filter by Region"
            options={options}
          ></Select>
        </section>
        {/* Countries to put */}
        <section className="pb-[45px] ">
          <InfiniteScroll
            className="grid gap-[74px] place-content-center  grid-cols-[repeat(auto-fill,minmax(264px,auto))]"
            dataLength={countries.data.length} //This is important field to render the next data
            next={loadMoreCountries}
            hasMore={countries.data.length < countries.total}
            loader={
              <>
                {[1, 2, 3, 4].map(num => (
                  <CountryLoader key={num} />
                ))}
              </>
            }
            endMessage={
              !countries.data.length &&
              [1, 2, 3, 4].map(num => <CountryLoader key={num} />)
            }
          >
            {countries.data.map(country => (
              <Country
                key={country.slug}
                name={country.name?.common}
                slug={country.name?.slug}
                img={country.flags?.svg}
                capital={country.capital}
                region={country.region}
                population={country.population}
              />
            ))}
          </InfiniteScroll>
        </section>
      </div>
    </main>
  );
};

export default HomeMain;
