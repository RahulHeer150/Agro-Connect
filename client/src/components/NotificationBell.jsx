import { Bell } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUnreadCount } from "../services/notificationService";

export const NotificationBell = () => {
  const [count, setCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCount();
  }, []);

  const fetchCount = async () => {
    try {
      const data = await getUnreadCount();

      setCount(data.count);
    } catch (error) {
      console.error(error.message);
    }
  };
  return(
    <button
    onClick={()=>navigate("/notifications")}
     className="relative">
    <Bell className="w-6 h-6"/>

    {count>0 && (
        <span  className="
            absolute
            -top-2
            -right-2
            bg-red-500
            text-white
            text-xs
            rounded-full
            w-5
            h-5
            flex
            items-center
            justify-center
          ">
            {count}

        </span>
    )}

    </button>

  )
};

