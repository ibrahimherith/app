import { useState } from "react";

const Sidebar = () => {
  const [currentUser, setCurrentUser] = useState({
    name: "John Doe",
    role: "admin",
  });

  // State for filtering
  // const [statusFilter, setStatusFilter] = useState("All");
  // const [departmentFilter, setDepartmentFilter] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

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

  // Switch user role (for demo purposes)
  const switchRole = (role) => {
    setCurrentUser({ ...currentUser, role });
  };

  return (
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
  );
};

export default Sidebar;
