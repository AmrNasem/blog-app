import { normalizeBy1000 } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Exapander from "./reuseable/Exapander";

function InfoSide({ className }: { className?: string }) {
  return (
    <div
      className={`${className} bg-gray-50 min-w-[300px] px-5 pt-15 space-y-8 min-h-dvh`}
    >
      <div className="max-w-48 mx-auto">
        <Link
          href="/profile"
          className="relative block w-25 h-25 rounded-full overflow-hidden mx-auto cursor-pointer border-3 border-red-500"
        >
          <Image
            src="/app/user-avatar.png"
            alt=""
            className="block h-full w-full object-cover p-0.5 rounded-full"
            width="200"
            height="200"
          />
        </Link>
        <h3 className="my-2 text-lg font-bold text-center">amr_nasem200</h3>
        <h3 className="text-sm text-center text-gray-500">amr@gmail.com</h3>
        <h3 className="text-sm text-center text-gray-500">
          This is my super awesome bio.
        </h3>
      </div>
      <div className="flex justify-between items-center p-1">
        <div className="text-center flex-grow-1 border-e px-2 py-1">
          <h4 className="mb-0 text-xl font-bold">{normalizeBy1000(20)}</h4>
          <span className="block text-sm text-gray-500">Posts</span>
        </div>
        <div className="text-center flex-grow-1 border-e px-2 py-1">
          <h4 className="mb-0 text-xl font-bold">{normalizeBy1000(2000)}</h4>
          <span className="block text-sm text-gray-500">Followers</span>
        </div>
        <div className="text-center flex-grow-1 px-2 py-1">
          <h4 className="mb-0 text-xl font-bold">{normalizeBy1000(320)}</h4>
          <span className="block text-sm text-gray-500">Followings</span>
        </div>
      </div>
      <div>
        <h3 className="font-bold text-md mb-3">About Me</h3>
        <Exapander color="#fbf9fa" btnTextColor="#555">
        <p className="text-sm text-gray-500 max-w-60">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur
          inventore totam doloremque soluta, id quae voluptate ab repudiandae.
          Iusto libero nesciunt eveniet esse commodi vel minus tempore debitis
          perferendis delectus?
        </p>
        </Exapander>
      </div>
    </div>
  );
}

export default InfoSide;
