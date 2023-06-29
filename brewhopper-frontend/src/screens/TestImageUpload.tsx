import { useEffect, useState } from "react";
import axios from "axios";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

export default function TestImageUpload() {
  const [file, setFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  // const [res, setRes] = useState({});
  const handleSelectFile = (e: any) => setFile(e.target.files[0]);
  const handleUpload = async () => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("image", file);
      const res = await axios.post(
        "http://localhost:5001/api/upload-cloud",
        data
      );
      // setRes(res.data);
    } catch (error) {
      alert("error.message");
    } finally {
      setLoading(false);
    }
  };

  // async function getImages() {
  //   try {
  //     const response = await fetch(
  //       "https://res.cloudinary.com/dgxtj6bta/image/upload/beer-image--1687990739635.jpg"
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch the image");
  //     }
  //     const imageData = await response;
  //     console.log(imageData);

  //     // return imageURL;
  //   } catch (error) {
  //     console.log(error);
  //     return null;
  //   }
  // }

  // useEffect(() => {
  //   getImages();
  // }, []);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "dgxtj6bta",
    },
  });
  const myImage = cld.image("beer-image--1687990739635");
  return (
    <div className="App">
      <label htmlFor="file" className="btn-grey">
        {" "}
        select file
      </label>
      {file && <center> {file.name}</center>}
      <input
        id="file"
        type="file"
        onChange={handleSelectFile}
        multiple={false}
      />

      {file && (
        <>
          <button onClick={handleUpload} className="btn-green">
            {loading ? "uploading..." : "upload to cloudinary"}
          </button>
        </>
      )}
      <AdvancedImage cldImg={myImage} />
    </div>
  );
}
