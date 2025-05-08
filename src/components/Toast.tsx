
// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "../redux/hooks";
// import { hideToast } from "../redux/features/toastSlice";

// const Toast: React.FC = () => {
//   const { message, type, visible } = useAppSelector((state) => state.toast);
//   const dispatch = useAppDispatch();

//   useEffect(() => {
//     if (visible) {
//       const timer = setTimeout(() => {
//         dispatch(hideToast());
//       }, 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [visible, dispatch]);

//   if (!visible) return null;

//   return (
//     <div
//       className={`fixed top-5 right-5 px-4 py-2 rounded shadow-md text-white bg-${
//         type === "success" ? "green" : type === "error" ? "red" : "blue"
//       }-500 z-50`}
//     >
//       {message}
//     </div>
//   );
// };

// export default Toast;

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { hideToast } from "../redux/features/toastSlice";

const bgColorMap = {
  success: "bg-green-500",
  error: "bg-red-500",
  info: "bg-blue-500",
};

const Toast: React.FC = () => {
  const { message, type, visible } = useAppSelector((state) => state.toast);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-2 rounded shadow-md text-white text-sm font-medium transition-opacity duration-300 ${
        bgColorMap[type] || "bg-gray-700"
      }`}
    >
      {message || "Something happened"}
    </div>
  );
};

export default Toast;
