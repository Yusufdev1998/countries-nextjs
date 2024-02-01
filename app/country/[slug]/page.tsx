import NumberFormat from "@/utils/NumberFormat";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
  const res = await fetch(
    "https://frontend-mentor-apis-6efy.onrender.com/countries"
  );
  const result = await res.json();

  return [result.data.map(country => ({ slug: country.name.slug }))];
}

async function getCountry(params) {
  const res = await fetch(
    `https://frontend-mentor-apis-6efy.onrender.com/countries/${params.slug}`
  );
  const country = await res.json();

  return country;
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const country = await fetch(
    `https://frontend-mentor-apis-6efy.onrender.com/countries/${slug}`
  ).then(res => res.json());

  // optionally access and extend (rather than replace) parent metadata

  return {
    title: `Country - ${country.name.common}`,
    icons: {
      icon: country.flags.png,
    },
  };
}

export default async ({ params }) => {
  const country = await getCountry(params);
  return (
    <main className="pt-20 dark:bg-body-dark min-h-[calc(100%_-_80px)]">
      <div className="container mx-auto">
        <Link
          href={"/"}
          className="text-primary dark:bg-header-dark dark:text-white mb-20 font-light inline-flex rounded-md items-center gap-[10px] py-[10px] pl-8 pr-10 shadow-[0px_0px_7px_0px_rgba(0,0,0,0.29)]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              className="fill-current"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.46447 4.10744L7.64298 5.28596L3.75389 9.17504L18.6031 9.17504L18.6031 10.825L3.75389 10.825L7.64298 14.714L6.46447 15.8926L0.57191 10L6.46447 4.10744Z"
            />
          </svg>
          Back
        </Link>
        {/* country details */}
        {country && (
          <section className="flex gap-[120px] items-center">
            <img
              src={country.flags.svg}
              alt={country.flags.alt}
              width={560}
              height={401}
              style={{
                width: 560,
                height: 401,
                objectFit: "cover",
              }}
            />
            <div className="text-primary dark:text-white grow">
              <h3 className="text-[2rem] font-extrabold mb-6">
                {country.name.common}
              </h3>
              <div className="flex justify-between">
                <ul>
                  <li className="leading-8 font-semibold">
                    Native Name:{" "}
                    <span className="font-light">
                      {country.name.nativeName}
                    </span>
                  </li>
                  <li className="leading-8 font-semibold">
                    Population:{" "}
                    <span className="font-light">
                      {NumberFormat(country.population)}
                    </span>
                  </li>
                  <li className="leading-8 font-semibold">
                    Region: <span className="font-light">{country.region}</span>
                  </li>
                  <li className="leading-8 font-semibold">
                    Sub Region:{" "}
                    <span className="font-light">{country.subregion}</span>
                  </li>
                  <li className="leading-8 font-semibold">
                    Capital:{" "}
                    <span className="font-light">
                      {country.capital?.join(", ")}
                    </span>
                  </li>
                </ul>
                <ul>
                  <li className="leading-8 font-semibold">
                    Top Level Domain: <span className="font-light">België</span>
                  </li>
                  <li className="leading-8 font-semibold">
                    Currencies:{" "}
                    <span className="font-light">
                      {country.currencies?.join(", ")}
                    </span>
                  </li>
                  <li className="leading-8 font-semibold">
                    Languages:{" "}
                    <span className="font-light">
                      {" "}
                      {country.languages?.join(", ")}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="leading-6 max-w-[598px] font-semibold flex items-center gap-4 mt-[68px]">
                <span className="min-w-max">Border Countries:</span>
                <ul className="flex gap-[10px] overflow-auto no-scrollbar p-2 mask">
                  {country.borders?.map(border => (
                    <Link href={`/country/${border.slug}`} key={border.slug}>
                      <li className="font-light px-[27px] dark:bg-header-dark py-1 min-w-max rounded-sm shadow-[0px_0px_4px_1px_rgba(0,0,0,0.10)]">
                        {border.common}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
};
