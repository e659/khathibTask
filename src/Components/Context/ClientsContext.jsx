import { createContext, useContext, useState, useEffect } from "react";
import { BASEURL } from "../../../constans/index";
import axios from "axios";

// create Context
export const clientsContext = createContext();
export default function ClientsContextProvider(props) {
  // change fileStyle
  const [fileName, setFileName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null); // To store the preview image
  const [imagePreview, setImagePreview] = useState(null); // To store the preview image
  // Handle the file input change
  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];

    if (file) {
      const fileType = file.type.split("/")[0]; // Check if file is an image
      if (fileType !== "image") {
        alert("Please upload a valid image file.");
        return;
      }

      setFileName(file.name); // Update file name for display
      setImageFile(file); // Set the image file
      setFieldValue("image", file); // Set file in Formik's state
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      // Generate preview for image
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result); // Set the preview URL once loaded
      };
      reader.readAsDataURL(file); // Read the image file as a data URL
    }
  };

  return (
    <clientsContext.Provider value={{handleFileChange,imagePreview,fileName,setImagePreview}}>
      {props.children}
    </clientsContext.Provider>
  );
}
