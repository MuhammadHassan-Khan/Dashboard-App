import { useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import BackButton from "../BackButton";


const AlbumForm = ({ albumToEdit, fetchAlbums, onClose }) => {
  const [albumName, setAlbumName] = useState(albumToEdit?.albumName || "");
  const [description, setDescription] = useState(albumToEdit?.description || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (albumName && description) {
      try {
        if (albumToEdit) {
          const albumRef = doc(db, "albums", albumToEdit.id);
          await updateDoc(albumRef, { albumName, description });
        } else {
          // Add new album
          await addDoc(collection(db, "albums"), {
            albumName,
            description,
            createdAt: new Date().toISOString(),
          });
        }
        fetchAlbums();
        onClose();
      } catch (error) {
        console.error("Error saving album: ", error);
      }
    }
  };

  return (
    <>
      <BackButton></BackButton>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-4 rounded shadow-md max-w-md"
      >

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Album Name
          </label>
          <input
            type="text"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter album name"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter album description"
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {albumToEdit ? "Update Album" : "Add Album"}
        </button>
      </form>
    </>
  );
};

export default AlbumForm;
