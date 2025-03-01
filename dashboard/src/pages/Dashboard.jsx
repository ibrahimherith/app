import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComplaints } from "../redux/complaintSlice";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState({
    name: "John Doe",
    role: "admin", // Can be 'admin', 'analyst', or 'staff'
  });

  // State for filtering
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(true);

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

  // Access control based on user role
  const rolePermissions = {
    admin: {
      canCreate: true,
      canEdit: true,
      canDelete: true,
      canAssign: true,
      canViewAll: true,
      canExport: true,
    },
    analyst: {
      canCreate: false,
      canEdit: false,
      canDelete: false,
      canAssign: false,
      canViewAll: true,
      canExport: true,
    },
    staff: {
      canCreate: true,
      canEdit: true,
      canDelete: false,
      canAssign: false,
      canViewAll: false,
      canExport: false,
    },
  };

  const permissions = rolePermissions[currentUser.role];

  // Filtered complaints
  const filteredComplaints = complaints.filter((complaint) => {
    const statusMatch =
      statusFilter === "All" || complaint.status === statusFilter;
    const departmentMatch =
      departmentFilter === "All" || complaint.department === departmentFilter;

    // Staff can only see complaints assigned to them
    if (currentUser.role === "staff") {
      return (
        statusMatch &&
        departmentMatch &&
        complaint.assignee === currentUser.name
      );
    }

    return statusMatch && departmentMatch;
  });

  // Switch user role (for demo purposes)
  const switchRole = (role) => {
    setCurrentUser({ ...currentUser, role });
  };

  // Get unique departments and statuses for filters
  const departments = ["All", ...new Set(complaints.map((c) => c.department))];
  const statuses = ["All", ...new Set(complaints.map((c) => c.status))];

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Prepare data for bar chart
  const prepareChartData = () => {
    // Count complaints by status
    const statusCounts = {
      Open: complaints.filter((c) => c.status === "Open").length,
      "In Progress": complaints.filter((c) => c.status === "In Progress")
        .length,
      Resolved: complaints.filter((c) => c.status === "Resolved").length,
    };

    // Convert to array format for Recharts
    return Object.keys(statusCounts).map((status) => ({
      name: status,
      count: statusCounts[status],
    }));
  };

  const chartData = prepareChartData();

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "block" : "hidden"
        } md:block md:flex-shrink-0 bg-gray-800 w-64 fixed h-full md:relative z-10`}
      >
        <div className="h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between h-16 flex-shrink-0 px-4 bg-gray-900">
            <div className="flex-1 flex items-center justify-between">
              <div className="flex-1 px-2 flex items-center">
                <span className="text-white text-xl font-semibold">
                  MCT Dashboard
                </span>
              </div>
              <button
                onClick={toggleSidebar}
                className="md:hidden text-gray-300 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-5 flex-1 px-2 bg-gray-800 space-y-1">
            <a
              href="#"
              className="bg-gray-900 text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
            >
              <svg
                className="mr-3 h-6 w-6 text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
            >
              <svg
                className="mr-3 h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              All Complaints
            </a>

            {(permissions.canCreate || permissions.canAssign) && (
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                New Complaint
              </a>
            )}

            {permissions.canViewAll && (
              <a
                href="#"
                className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
              >
                <svg
                  className="mr-3 h-6 w-6 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                Reports
              </a>
            )}

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white group flex items-center px-2 py-2 text-base font-medium rounded-md"
            >
              <svg
                className="mr-3 h-6 w-6 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </a>
          </nav>

          {/* User Profile */}
          <div className="flex-shrink-0 flex bg-gray-700 p-4">
            <div className="flex items-center">
              <div className="inline-flex h-10 w-10 rounded-full bg-gray-500 text-white justify-center items-center">
                {currentUser.name.charAt(0)}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">
                  {currentUser.name}
                </p>
                <p className="text-xs font-medium text-gray-300">
                  {currentUser.role.charAt(0).toUpperCase() +
                    currentUser.role.slice(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Role Switcher (for demo only) */}
          <div className="px-4 py-3 bg-gray-700">
            <label className="text-xs font-medium text-gray-300">
              Demo: Switch Role
            </label>
            <div className="flex flex-col space-y-2 mt-2">
              <button
                onClick={() => switchRole("admin")}
                className={`px-2 py-1 text-xs rounded ${
                  currentUser.role === "admin"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-600 text-gray-200"
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => switchRole("analyst")}
                className={`px-2 py-1 text-xs rounded ${
                  currentUser.role === "analyst"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-600 text-gray-200"
                }`}
              >
                Analyst
              </button>
              <button
                onClick={() => switchRole("staff")}
                className={`px-2 py-1 text-xs rounded ${
                  currentUser.role === "staff"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-600 text-gray-200"
                }`}
              >
                Staff
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="md:hidden bg-white border-b border-gray-200 flex items-center justify-between px-4 py-2">
          <button
            onClick={toggleSidebar}
            className="px-3 py-1 border border-gray-200 rounded text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="text-lg font-semibold">Dashboard</div>
          <div className="w-8"></div> {/* Empty div for flex spacing */}
        </div>

        {/* Content area */}
        <div className="flex-1 overflow-auto p-4 mb-6">
          <div className="mx-auto">
            <h1 className="text-2xl font-semibold text-gray-900 hidden md:block mb-6">
              Dashboard
            </h1>

            {/* Stats Row - Visible to Admin and Analyst */}
            {(currentUser.role === "admin" ||
              currentUser.role === "analyst") && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Total Complaints
                          </dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {complaints.length}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Open Complaints
                          </dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {
                                complaints.filter((c) => c.status === "Open")
                                  .length
                              }
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            In Progress
                          </dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {
                                complaints.filter(
                                  (c) => c.status === "In Progress"
                                ).length
                              }
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                        <svg
                          className="h-6 w-6 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">
                            Resolved
                          </dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">
                              {
                                complaints.filter(
                                  (c) => c.status === "Resolved"
                                ).length
                              }
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bar Chart - Visible to Admin and Analyst */}
            {(currentUser.role === "admin" ||
              currentUser.role === "analyst") && (
              <div className="bg-white shadow rounded-lg mb-6 p-4">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  Complaints by Status
                </h2>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="count"
                        name="Number of Complaints"
                        fill="#8884d8"
                        barSize={60}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Filters & Actions */}
            <div className="bg-white shadow rounded-lg mb-6">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                    <div>
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Status
                      </label>
                      <select
                        id="status"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      {/* <label
                        htmlFor="department"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Department
                      </label>
                      <select
                        id="department"
                        value={departmentFilter}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                      >
                        {departments.map((dept) => (
                          <option key={dept} value={dept}>
                            {dept}
                          </option>
                        ))}
                      </select> */}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    {permissions.canExport && (
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Export
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow overflow-hidden rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Jina
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Mkoa / Wilaya
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Aina ya habari
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        kichwa cha habari
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tarehe
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredComplaints.map((complaint) => (
                      <tr key={complaint.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {complaint.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {complaint.place}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {complaint.news_type}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {complaint.news_title}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {complaint.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              complaint.status === "Open"
                                ? "bg-red-100 text-red-800"
                                : complaint.status === "In Progress"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {complaint.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2 justify-end">
                            <button className="text-indigo-600 hover:text-indigo-900">
                              View
                            </button>
                            {permissions.canEdit && (
                              <button className="text-blue-600 hover:text-blue-900">
                                Edit
                              </button>
                            )}
                            {permissions.canDelete && (
                              <button className="text-red-600 hover:text-red-900">
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty state */}
              {filteredComplaints.length === 0 && (
                <div className="px-6 py-12 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No complaints found
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Try adjusting your filters or create a new complaint.
                  </p>
                  {permissions.canCreate && (
                    <div className="mt-6">
                      <button
                        type="button"
                        className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        New Complaint
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
