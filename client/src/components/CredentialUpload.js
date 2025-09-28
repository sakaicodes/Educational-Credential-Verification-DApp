import React, { useState } from "react";

// UploadCredential component
export default function UploadCredential() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [ipfsHash, setIpfsHash] = useState("");
  const [uploading, setUploading] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const fileName = selectedFile.name;
      const metadata = JSON.stringify({
        name: fileName,
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_PINATA_JWT}`,
          },
          body: formData,
        }
      );
      const resData = await res.json();
      console.log(resData);
      setIpfsHash(resData.IpfsHash);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
      setSelectedFile(null);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md border border-gray-300">
        <h2 className="text-2xl font-bold mb-4">Upload Student Credential</h2>
        <label
          htmlFor="upload-file"
          className="block text-gray-700 font-medium mb-2"
        >
          Choose File
        </label>
        <input
          type="file"
          id="upload-file"
          className="w-full p-2 bg-gray-200 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400"
          onChange={changeHandler}
        />
        <div className="flex justify-center">
          <button
            className={`mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mx-auto ${uploading && "opacity-50 cursor-not-allowed"
              }`}
            onClick={handleSubmission}
            disabled={uploading || !selectedFile}
          >
            {uploading ? "Uploading..." : "Upload To IPFS"}
          </button>
        </div>
        {ipfsHash && (
          <div className="mt-4 text-center">
            <p className="text-gray-700">
              File uploaded successfully. IPFS Hash: {ipfsHash}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
