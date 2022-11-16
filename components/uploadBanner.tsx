import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Modal } from "@mantine/core";
import prisma from "../lib/prisma";
import { Banner, bannerData, bannerNotification } from "../lib/types";
import { useRouter } from "next/router";

async function postBanner(bannerData: bannerData) {
  const response = await fetch("../../api/photos/postBanner", {
    method: "POST",
    body: JSON.stringify(bannerData),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

//FIX TYPE
const UploadBanner = ({ userID }: any) => {
  //initialize all banners
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 0,
      link: "",
    },
  ]);
  //fetch all banners
  useEffect(() => {
    fetch("../../api/photos/getBanners")
      .then((res) => res.json())
      .then((data) => setBanners(data));
  }, []);
  //modal opener
  const [verify, setVerify] = useState(false);
  const [notification, setNotification] = useState<bannerNotification>({
    message: "",
    status: false,
  });
  //data were sending to API
  const [bannerDataSend, setBannerDataSend] = useState<bannerData>({
    id: userID,
    banner: "",
  });
  //send data to API
  const router = useRouter();
  const handleSelect = async () => {
    try {
      await postBanner(bannerDataSend);
      setVerify(false);
      setNotification((prevState) => {
        return {
          message: "Success",
          status: true,
        };
      });
      router.push(`../userProfile/success`);
    } catch (error) {
      setNotification((prevState) => {
        return {
          message: "error try again later",
          status: true,
        };
      });
    }
  };
  //opens modal when clicking image, sets data to image
  const handleClick = (link: string) => {
    setBannerDataSend((prevstate: any) => {
      return {
        ...prevstate,
        banner: link,
      };
    });
    setVerify(true);
  };
  return (
    <main className="h-3/4 flex flex-col">
      <section className="overflow-y-auto h-full mb-32">
        {banners.map((banner: Banner, index: number) => {
          return (
            <div key={banner.id} onClick={() => handleClick(banner.link)}>
              <img className="h-32 w-full sm:h-full mt-5 " src={banner.link} />
              <Modal
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
                opened={verify}
                onClose={() => setVerify(false)}
              >
                <h1>Is this the banner that you want?</h1>
                <img
                  className="h-32 w-full mt-5 "
                  src={bannerDataSend.banner}
                />
                <Button onClick={handleSelect} className="bg-blue-500">
                  Submit
                </Button>
              </Modal>
              <Modal
                transition="fade"
                transitionDuration={600}
                transitionTimingFunction="ease"
                opened={notification.status}
                onClose={() =>
                  setNotification((prevState) => {
                    return {
                      ...prevState,
                      status: false,
                    };
                  })
                }
              >
                {notification.message}
              </Modal>
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default UploadBanner;
