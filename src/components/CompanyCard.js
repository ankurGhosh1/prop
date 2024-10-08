import React from "react";
import Link from "next/link";
import Image from "next/image";

function CompanyCard(props) {
  const { image, phone, url, name, address, description } = props;

  return (
    <div className="grid grid-cols-[200px_1fr] bg-white p-8 gap-4 rounded-xl my-8 max-sm:grid-cols-1">
      <div className="flex flex-col gap-4 items-center">
        <Image
          src={image ? image : null}
          width={120}
          height={120}
          className="border border-dark rounded-full"
          alt={name}
        />
        <Link
          href={`tel:${phone ? phone : null}`}
          className="p-3 border border-orange w-[150px] text-center text-sm max-sm:hidden"
        >
          {phone ? phone : null}
        </Link>
        <Link
          href={`${url ? url : null}`}
          className="p-3 bg-orange text-white w-[150px] text-center text-sm  max-sm:hidden"
          target="_blank"
          rel="nofollow"
        >
          Visit Website
        </Link>
      </div>
      <div>
        <h3 className="text-3xl text-dark mb-2 max-sm:text-2xl">
          {name ? name : null}
        </h3>
        <address className="text-orange text-sm">
          {address ? address : null}
        </address>
        <p className="text-dark text-base max-w-[750px] mt-8">
          {description ? description : null}
        </p>
      </div>
      <div className="flex items-center justify-center gap-4 min-sm:hidden flex-wrap	">
        <Link
          href={`tel:${phone ? phone : null}`}
          className="p-3 border border-orange w-[150px] text-center text-sm"
        >
          {phone ? phone : null}
        </Link>
        <Link
          href={`${url ? url : null}`}
          className="p-3 bg-orange text-white w-[150px] text-center text-sm"
          target="_blank"
          rel="nofollow"
        >
          Visit Website
        </Link>
      </div>
    </div>
  );
}

export default CompanyCard;
