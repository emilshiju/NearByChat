import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";


function ImageCropper(props) {
  const { imageToCrop, onImageCropped,onPathCropped } = props;

  const [cropConfig, setCropConfig] = useState(
    // default crop config
    {
      unit: "%",
      width: 100, // Set default width to 50%
      height: 100, 
      aspect: 16/9
    }
  );

  const [imageRef, setImageRef] = useState();

  async function cropImage(crop) {
    console.log("22222222222222222222222222222222222222222222222222222222222222222222222222222")
    if (imageRef && crop.width && crop.height) {
       
      const {croppedImageUrl,blob} = await getCroppedImage(
        imageRef,
        crop,
        "croppedImage.jpeg" // destination filename
      );
      
      // calling the props function to expose
      // croppedImage to the parent component
      console.log(blob)
      onPathCropped(blob)
      onImageCropped(croppedImageUrl);
      
    }
  }




  function getCroppedImage(sourceImage, cropConfig, fileName) {
    {console.log("33333333333333333333333333333333333333333333333333333333")}
    // creating the cropped image from the source image
    const canvas = document.createElement("canvas");
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width,
      cropConfig.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        // returning an error
        if (!blob) {
          reject(new Error("Canvas is empty"));
          return;
        }

        blob.name = fileName;
        // creating a Object URL representing the Blob object given
       
        const croppedImageUrl = window.URL.createObjectURL(blob);


        resolve({croppedImageUrl,blob});
      }, "image/jpeg");
    });
  }
  {
    console.log("Ooooooooooooooo yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyooooooooooo");
  }

  return (
    <div style={{paddingLeft:"350px",paddingTop:"180px"}}>
    <ReactCrop
    style={{  width:'300px' }}
      src={imageToCrop}
      crop={cropConfig}
      ruleOfThirds
      onImageLoaded={(imageRef) => setImageRef(imageRef)}
      onComplete={(cropConfig) => cropImage(cropConfig)}
      onChange={(cropConfig) => setCropConfig(cropConfig)}
      crossorigin="anonymous" // to avoid CORS-related problems
    />
    </div>
  );
}

ImageCropper.defaultProps = {
  onImageCropped: () => {},
};

export default ImageCropper;
