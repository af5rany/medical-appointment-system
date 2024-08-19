const AppointmentCard = ({
  date,
  time,
  patientName,
  onApprove,
  onDecline,
  onViewDetails,
}) => {
  // console.log("fdsfsdfsfdfs", date, time);
  const formatDateWithDay = (dateString) => {
    if (!dateString) return "Invalid Date";
    const date = new Date(dateString);
    return `${date.toLocaleDateString("en-US", {
      weekday: "long",
    })}, ${date.toLocaleDateString("en-US")}`;
  };

  return (
    <div className="flex-1 border rounded-lg shadow-sm p-4 mb-4 bg-white hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xl font-semibold text-gray-700">
          {formatDateWithDay(date)}
        </span>
        <span className="text-sm font-medium text-gray-500">
          {patientName || "Unknown Patient"}
        </span>
      </div>
      <div className="text-gray-600">
        <div className="flex items-center mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-2 text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>{time || "Invalid Time"}</span>
        </div>
      </div>
      <div className="mt-4 flex">
        {onViewDetails && (
          <button
            onClick={onViewDetails}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded mr-2 transition"
          >
            View Details
          </button>
        )}
        {onApprove && (
          <button
            onClick={onApprove}
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded mr-2 transition"
          >
            Approve
          </button>
        )}
        {onDecline && (
          <button
            onClick={onDecline}
            className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded transition"
          >
            Decline
          </button>
        )}
      </div>
    </div>
  );
};
export default AppointmentCard;
