"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { useState } from "react";
import { CameraIcon } from "./_components/icons";

export default function Page() {
  const [data, setData] = useState({
    name: "Dr. Marc Hervé",
    role: "DG Vétérinaire",
    email: "marc.herve@bircovet.ci",
    phone: "+225 07 01 23 45 67",
    establishment: "BIRCOVET Abidjan",
    profilePhoto: "/images/user/user-01.png",
    coverPhoto: "/images/cover/cover-01.png",
  });

  const handleChange = (e: any) => {
    if (e.target.name === "profilePhoto") {
      const file = e.target?.files[0];
      setData({
        ...data,
        profilePhoto: file && URL.createObjectURL(file),
      });
    } else if (e.target.name === "coverPhoto") {
      const file = e.target?.files[0];
      setData({
        ...data,
        coverPhoto: file && URL.createObjectURL(file),
      });
    } else {
      setData({
        ...data,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div className="mx-auto w-full max-w-[970px]">
      <Breadcrumb pageName="Mon Profil" />

      <div className="overflow-hidden rounded-xl border border-stroke bg-white shadow-card dark:border-stroke-dark dark:bg-gray-dark">
        <div className="relative z-20 h-35 md:h-48">
          <Image
            src={data?.coverPhoto}
            alt="profile cover"
            className="h-full w-full rounded-t-xl object-cover object-center"
            width={970}
            height={192}
            style={{ width: "auto", height: "auto" }}
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#04A154] px-4 py-2 text-sm font-medium text-white hover:bg-[#038343]"
            >
              <input
                type="file"
                name="coverPhoto"
                id="coverPhoto"
                className="sr-only"
                onChange={handleChange}
                accept="image/png, image/jpg, image/jpeg"
              />
              <CameraIcon />
              <span>Modifier</span>
            </label>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-16 h-24 w-full max-w-24 rounded-full bg-white/20 p-1 backdrop-blur sm:h-32 sm:max-w-[128px] sm:p-2">
            <div className="relative drop-shadow-2">
              {data?.profilePhoto && (
                <>
                  <Image
                    src={data?.profilePhoto}
                    width={128}
                    height={128}
                    className="overflow-hidden rounded-full"
                    alt="profile"
                  />
                  <label
                    htmlFor="profilePhoto"
                    className="absolute bottom-0 right-0 flex size-7 cursor-pointer items-center justify-center rounded-full bg-[#04A154] text-white hover:bg-[#038343] sm:bottom-1 sm:right-1"
                  >
                    <CameraIcon />
                    <input
                      type="file"
                      name="profilePhoto"
                      id="profilePhoto"
                      className="sr-only"
                      onChange={handleChange}
                      accept="image/png, image/jpg, image/jpeg"
                    />
                  </label>
                </>
              )}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1 text-2xl font-bold text-dark dark:text-white">
              {data?.name}
            </h3>
            <p className="font-medium text-[#04A154]">{data?.role}</p>
            <p className="text-sm text-gray-5">{data?.establishment}</p>
            
            <div className="mx-auto mb-5.5 mt-6 grid max-w-[500px] grid-cols-2 rounded-lg border border-stroke bg-gray-2 py-4 shadow-card dark:border-stroke-dark dark:bg-dark-2">
              <div className="flex flex-col items-center justify-center gap-1 border-r border-stroke px-4 dark:border-stroke-dark">
                <span className="text-2xl font-bold text-dark dark:text-white">
                  125
                </span>
                <span className="text-sm text-gray-5">Consultations</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 px-4">
                <span className="text-2xl font-bold text-dark dark:text-white">
                  45
                </span>
                <span className="text-sm text-gray-5">Patients</span>
              </div>
            </div>

            <div className="mx-auto max-w-[720px] text-left">
              <h4 className="mb-4 font-medium text-dark dark:text-white">
                Informations Personnelles
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-stroke bg-white p-3 dark:border-stroke-dark dark:bg-gray-dark">
                  <span className="text-gray-5">📧</span>
                  <span className="text-dark dark:text-white">{data?.email}</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-stroke bg-white p-3 dark:border-stroke-dark dark:bg-gray-dark">
                  <span className="text-gray-5">📞</span>
                  <span className="text-dark dark:text-white">{data?.phone}</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg border border-stroke bg-white p-3 dark:border-stroke-dark dark:bg-gray-dark">
                  <span className="text-gray-5">🏥</span>
                  <span className="text-dark dark:text-white">{data?.establishment}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center gap-3">
              <button className="rounded-lg bg-[#04A154] px-6 py-2 text-white hover:bg-[#038343]">
                Modifier le profil
              </button>
              <button className="rounded-lg border border-stroke bg-white px-6 py-2 hover:bg-gray-2 dark:border-stroke-dark dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2">
                Changer le mot de passe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
