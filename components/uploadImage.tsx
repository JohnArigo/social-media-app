import React, { useEffect, useState } from "react";
import Head from "next/head";

async function postImage(dataToSend: any) {
  const response = await fetch("../../api/postImage", {
    method: "POST",
    body: JSON.stringify(dataToSend),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}
//FIX TYPE
const UploadImage = ({ userId }: any) => {
  console.log(userId);
  const [image, setImage] = useState({
    id: userId,
    image: "initial",
  });
  console.log(image);
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
    <>
      <Head>
        <script
          src="https://widget.Cloudinary.com/v2.0/global/all.js"
          type="text/javascript"
        ></script>
      </Head>

      <button type="button" id="leftbutton" onClick={openWidget}>
        Upload new profile photo
      </button>
      <img src={image.image} />
      <button onClick={handleSubmit}>Upload</button>
    </>
  );
};

export default UploadImage;
