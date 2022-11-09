import React, { useState } from "react";
import Head from "next/head";

const Index = () => {
  //const [imagePublicId, setImagePublicId] = useState(" ");

  // const openWidget = () => {
  //   // create the widget
  //   if (typeof window !== undefined) {
  //     const widget = window.cloudinary.createUploadWidget(
  //       {
  //         cloudName: "olanetsoft",
  //         uploadPreset: "w42epls7",
  //       },
  //       ({ error, result }: any) => {
  //         if (
  //           result.event === "success" &&
  //           result.info.resource_type === "image"
  //         ) {
  //           console.log(result.info);
  //           //setImagePublicId(result.info.public_id);
  //         }
  //       }
  //     );
  //     widget.open(); // open up the widget after creation
  //   } else {
  //     return null;
  //   }
  // };
  const [file, setFile] = useState<string>();
  console.log(file);
  const handleChange = (event: any) => {
    if (event.target.files && event.target.files[0]) {
      setFile(URL.createObjectURL(event.target.files[0]));
    }
  };

  console.log(file);
  return (
    <main>
      <input type="file" onChange={handleChange} />
      <img src={file} />
    </main>
  );
};

export default Index;
