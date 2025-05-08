// src/components/AnnouncementBar.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import getBaseUrl from "../../utils/baseURL";

type Announcement = {
  id: number;
  message: string;
};

const AnnouncementBar = () => {
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fetchAnnouncement = async () => {
      try {
        const res = await axios.get(`${getBaseUrl()}/public/announcements`);
        if (res.data.length > 0) {
          setAnnouncement(res.data[0]); // Show the first active announcement
        }
      } catch (error) {
        console.error("Failed to load announcement", error);
      }
    };
    fetchAnnouncement();
  }, []);

  if (!announcement || !visible) return null;

  return (
    <div className="bg-yellow-100 text-yellow-800 py-2 px-4 text-center text-sm relative">
      {announcement.message}
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl leading-none text-yellow-700 hover:text-yellow-900"
      >
        ×
      </button>
    </div>
  );
};

export default AnnouncementBar;
