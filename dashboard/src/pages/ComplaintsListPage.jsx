import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComplaints } from "../redux/complaintSlice";

const ComplaintsListPage = () => {
  const dispatch = useDispatch();
  const { complaints, status, error } = useSelector((state) => state.complaint);

  useEffect(() => {
    dispatch(fetchComplaints());
  }, [dispatch]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Inapakia malalamiko...</div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded">
        {error || "Imeshindwa kupakia malalamiko"}
      </div>
    );
  }

  if (complaints.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-4">Malalamiko Yaliyowasilishwa</h1>
        <div className="text-gray-500">
          Hakuna malalamiko yaliyowasilishwa bado.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Malalamiko Yaliyowasilishwa</h1>

      <div className="grid gap-4">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="border rounded p-4 bg-gray-50">
            <div className="flex justify-between mb-2">
              <span className="font-medium">{complaint.name}</span>
              <span className="text-sm text-gray-500">
                {new Date(complaint.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <div className="text-sm">
                <span className="font-semibold">Chombo cha Habari:</span>{" "}
                {complaint.media_outlet}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Aina ya Habari:</span>{" "}
                {complaint.news_type}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Tarehe:</span> {complaint.date}
              </div>
              <div className="text-sm">
                <span className="font-semibold">Hali:</span>{" "}
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                  {complaint.status}
                </span>
              </div>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="font-semibold mb-1">{complaint.news_title}</div>
              <p className="text-sm text-gray-700">{complaint.explanation}</p>
            </div>
            {complaint.fileURL && (
              <div className="mt-2 text-blue-600 text-sm">
                <a href={complaint.fileURL} target="_blank" rel="noreferrer">
                  Tazama Kielelezo
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintsListPage;
