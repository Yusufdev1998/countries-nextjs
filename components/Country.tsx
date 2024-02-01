import NumberFormat from "@/utils/NumberFormat";
import Image from "next/image";
import Link from "next/link";

const Country = ({ img, population, region, capital, name, slug }) => {
  return (
    <Link href={`/country/${slug}`}>
      <div className="text-primary dark:bg-header-dark dark:text-white  cursor-pointer pb-[22px] bg-white  overflow-hidden rounded-x/2 shadow-[0px_0px_7px_2px_rgba(0,0,0,0.03)]">
        <Image
          src={img}
          alt=""
          width={264}
          height={160}
          style={{
            objectFit: "cover",
            width: "100%",
            height: 160,
            // height: 160,
            // width: 264,
          }}
        ></Image>

        <div className="p-6">
          <h3 className="text-lg font-extrabold mb-4 leading-[26px]">{name}</h3>
          <ul className="flex flex-col gap-2">
            <li className="font-semibold text-sm leading-4">
              Population:{" "}
              <span className="font-light">{NumberFormat(population)}</span>
            </li>
            <li className="font-semibold text-sm leading-4">
              Region: <span className="font-light">{region}</span>
            </li>
            <li className="font-semibold text-sm leading-4">
              Capital: <span className="font-light">{capital}</span>
            </li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default Country;
