// lib/pexels.js
import axios from "axios";

const PEXELS_API_URL = "https://api.pexels.com/v1/";

export const fetchPhotosFromCollection = async (
  collectionId,
  page = 1,
  perPage = 20
) => {
  try {
    const response = await axios.get(
      `${PEXELS_API_URL}collections/${collectionId}`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_PEXELS_API_KEY,
        },
        params: {
          page,
          per_page: perPage,
          sort: 'desc', // Sort by latest uploads first
        },
      }
    );
    // Sort by ID in descending order (newer photos have higher IDs)
    const sortedMedia = response.data.media.sort((a, b) => b.id - a.id);
    return sortedMedia;
  } catch (error) {
    console.error("Error fetching photos:", error);
    return [];
  }
};
