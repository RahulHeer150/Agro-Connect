import { Bell } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUnreadCount } from "../services/notificationService";

const NotificationBell = () => {
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
    
  )
};
