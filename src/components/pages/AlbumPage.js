import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import AlbumForm from "./AlbumForm";

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [albumToEdit, setAlbumToEdit] = useState(null);

  const fetchAlbums = async () => {
    const querySnapshot = await getDocs(collection(db, "albums"));
    const albumsData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAlbums(albumsData);
  };

  const handleAddClick = () => {
    setAlbumToEdit(null);
    setShowForm(true);
  };

  const handleEditClick = (album) => {
    setAlbumToEdit(album);
    setShowForm(true);
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  return (
    <div className="p-4">
      {showForm ? (
        <AlbumForm
          albumToEdit={albumToEdit}
          fetchAlbums={fetchAlbums}
          onClose={() => setShowForm(false)}
        />
      ) : (
        <>
          <button
            onClick={handleAddClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Album
          </button>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-4">Albums</h2>
            {albums.length > 0 ? (
              albums.map((album) => (
                <div
                  key={album.id}
                  className="border-b border-gray-300 py-2 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-bold">{album.albumName}</h3>
                    <p>{album.description}</p>
                    <span className="text-gray-500 text-sm">
                      {new Date(album.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <button
                    onClick={() => handleEditClick(album)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                </div>
              ))
            ) : (
              <p>No albums yet.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AlbumList;
