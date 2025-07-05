import React, { useState } from "react";
import {
  useGetAnnouncementsQuery,
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} from "../../redux/features/admin/adminApi";
import { useAppDispatch } from "../../redux/hooks";
import { showToast } from "../../redux/features/toastSlice";

const ManageAnnouncements = () => {
  const dispatch = useAppDispatch();
  const { data: announcements = [], isLoading } = useGetAnnouncementsQuery();
  const [createAnnouncement] = useCreateAnnouncementMutation();
  const [updateAnnouncement] = useUpdateAnnouncementMutation();
  const [deleteAnnouncement] = useDeleteAnnouncementMutation();

  const [form, setForm] = useState({
    id: null as number | null,
    message: "",
    startTime: "",
    endTime: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!form.message.trim() || !form.startTime || !form.endTime) {
      dispatch(
        showToast({ type: "error", message: "All fields are required." })
      );
      return;
    }

    try {
      const payload = {
        message: form.message,
        startTime: new Date(form.startTime).toISOString(),
        endTime: new Date(form.endTime).toISOString(),
      };

      if (isEditing && form.id !== null) {
        await updateAnnouncement({ id: form.id, data: payload }).unwrap();
        dispatch(
          showToast({ type: "success", message: "Announcement updated." })
        );
      } else {
        await createAnnouncement(payload).unwrap();
        dispatch(
          showToast({ type: "success", message: "Announcement created." })
        );
      }
      resetForm();
    } catch (err: any) {
      dispatch(
        showToast({
          type: "error",
          message: err?.data?.message || "Operation failed.",
        })
      );
    }
  };

  const handleEdit = (announcement: any) => {
    setForm({
      id: announcement.id,
      message: announcement.message,
      startTime: announcement.startTime.split("T")[0],
      endTime: announcement.endTime.split("T")[0],
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAnnouncement(id).unwrap();
      dispatch(
        showToast({ type: "success", message: "Announcement deleted." })
      );
    } catch {
      dispatch(showToast({ type: "error", message: "Delete failed." }));
    }
  };

  const resetForm = () => {
    setForm({ id: null, message: "", startTime: "", endTime: "" });
    setIsEditing(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">📢 Manage Announcements</h2>

      <div className="bg-white border p-4 rounded mb-6">
        <h3 className="text-lg font-semibold mb-2">
          {isEditing ? "✏️ Edit Announcement" : "➕ Create Announcement"}
        </h3>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Enter message"
          className="w-full border rounded p-2 mb-2"
        />
        <div className="flex gap-4">
          <input
            type="date"
            name="startTime"
            value={form.startTime}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
          <input
            type="date"
            name="endTime"
            value={form.endTime}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
        <div className="flex justify-end gap-4 mt-4">
          <button onClick={handleSubmit} className="btn-primary px-4 py-2">
            {isEditing ? "Update" : "Create"}
          </button>
          {isEditing && (
            <button onClick={resetForm} className="px-4 py-2 border rounded">
              Cancel
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">📃 All Announcements</h3>
        {isLoading ? (
          <p>Loading...</p>
        ) : announcements.length === 0 ? (
          <p className="text-gray-600">No announcements found.</p>
        ) : (
          <ul className="space-y-3">
            {announcements.map((a) => (
              <li
                key={a.id}
                className="border p-4 rounded flex justify-between items-start"
              >
                <div>
                  <p className="font-medium">{a.message}</p>
                  <p className="text-sm text-gray-500">
                    {a.startTime.split("T")[0]} → {a.endTime.split("T")[0]}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(a)}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => handleDelete(a.id)}
                    className="text-red-600 hover:underline"
                  >
                    🗑 Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageAnnouncements;
