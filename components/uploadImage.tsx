import React, { useEffect, useState } from "react";
import Head from "next/head";
import Script from "next/script";
import { Button } from "@mantine/core";

async function postImage(dataToSend: any) {
  const response = await fetch("../../api/photos/postImage", {
    method: "POST",
    body: JSON.stringify(dataToSend),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
//FIX TYPE
const UploadImage = ({ userID }: any) => {
  console.log(userID);
  const [image, setImage] = useState({
    id: userID,
    image: "initial",
  });
  const openWidget = async () => {
    // create the widget
    if (typeof window !== undefined) {
      const widget = window.cloudinary.createUploadWidget(
        {
          cloudName: "dwbzf4ywk",
          uploadPreset: "ygua2mh2",
          sources: ["local", "url"],
        },
        (error: any, result: any) => {
          console.log(error);
          if (
            result?.event === "success" &&
            result?.info.resource_type === "image"
          ) {
            console.log(result?.info);
            setImage((prevstate) => {
              return {
                ...prevstate,
                image: result.info.url,
              };
            });
          }
        }
      );
      widget.open(); // open up the widget after creation
    } else {
      return null;
    }
  };

  const handleSubmit = async () => {
    try {
      await postImage(image);
      console.log("succes");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="h-96 flex flex-col">
      <Head>
        <script
          src="https://widget.Cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </Head>

      <button type="button" id="leftbutton" onClick={openWidget}>
        NEW PHOTO
      </button>
      {image.image === "initial" ? null : <img src={image.image} />}
      {image.image === "initial" ? null : (
        <Button className="bg-blue-500" onClick={handleSubmit}>
          Upload
        </Button>
      )}
    </main>
  );
};

export default UploadImage;
