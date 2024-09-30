"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import axios from "axios";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams(); // To get current query parameters
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedMachine, setSelectedMachine] = useState("");
  const [espids, setEspids] = useState<string[]>([]);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const redirectToSettings = () => {
    router.push("/settings");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Retrieve selectedMachine from localStorage on component mount
    const storedMachine = searchParams.get("machine") || localStorage.getItem("selectedMachine");
    if (storedMachine) {
      setSelectedMachine(storedMachine);
    }

    fetch("http://localhost:3001/api/data")
      .then((response) => response.json())
      .then((data) => {
        setEspids(data.espids);
        // If there's no storedMachine, set the first ESPID as the default
        if (!storedMachine && data.espids.length > 0) {
          setSelectedMachine(data.espids[0]);
          localStorage.setItem("selectedMachine", data.espids[0]);
        }
      })
      .catch((error) => console.error("Error fetching espids:", error));
  }, []);

  const setMachineInBackend = async (selectMachine: string) => {
    try {
      const res = await axios.get(`http://localhost:3001/api/data`, {
        params: { machine: selectMachine }
      });
      console.log('res: ', res.data);
    } catch (error) {
      console.error('Error fetching machine data:', error);
    }
  };

  useEffect(() => {
    // Trigger backend update when selectedMachine changes
    if (selectedMachine) {
      setMachineInBackend(selectedMachine);
    }
  }, [selectedMachine]);

  const handleMachineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedMachine(selectedValue);
    localStorage.setItem("selectedMachine", selectedValue); // Store selected value in localStorage
  
    // Update query params and navigate to the same page with the updated machine query
    router.push(`?machine=${selectedValue}`, { shallow: true }).then(() => {
      // Trigger a full page reload after updating the query params
      window.location.reload();
    });
  };

  const handleRefresh = () => {
    window.location.reload(); // Refresh the page
  };

  const formattedDate = currentTime.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
  });

  const formattedTime = currentTime
    .toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .toLowerCase();

  const notifications = [
    {
      id: 1,
      message: "Admin 1 inactive the machine.",
      time: "02:30 | 02 July, 2024",
    },
    {
      id: 2,
      message: "Admin 2 active the machine.",
      time: "02:30 | 02 July, 2024",
    },
    {
      id: 3,
      message: "Admin 4 inactive the machine.",
      time: "02:30 | 02 July, 2024",
    },
  ];

  return (
    <header className="bg-[#F4F7FE] flex flex-col sm:flex-row justify-between items-center">
      <div className="flex items-center gap-4 mb-4 sm:mb-0">
        <Image
          src="/logo.png"
          alt="logo"
          height={62}
          width={62}
          className="rounded-full"
        />
        <div className="flex flex-col">
          <span className="text-[#A0AEC0] font-normal text-xs">Welcome</span>
          <span className="text-[#2B3674] font-bold text-xl whitespace-nowrap overflow-hidden">
            George West
          </span>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 ">
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleRefresh}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            OK
          </button>
          <select
            value={selectedMachine}
            onChange={handleMachineChange}
            className="flex items-center justify-center text-gray-600 w-28 h-9 flex-shrink-0 rounded-lg bg-white font-normal text-sm"
          >
            <option value="">-Select-</option>
            {espids.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-1.5">
          <Image src="/calendar.svg" alt="calendar" height={19} width={19} />
          <span className="text-[#A3AED0] font-medium text-sm">Today</span>
          <span className="text-[#2B3674] font-medium text-sm whitespace-nowrap overflow-hidden">
            {formattedDate}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Image src="/clock.svg" alt="clock" height={19} width={19} />
          <span className="text-[#2B3674] font-medium text-sm">
            {formattedTime}
          </span>
        </div>
        <div className="flex items-center gap-4 w-44 h-11 rounded-full bg-white shadow-lg justify-center">
          <div className="relative">
            <Image
              src="/notification.svg"
              alt="notification"
              height={24}
              width={24}
              onClick={toggleNotifications}
              className="cursor-pointer"
            />
            {showNotifications && (
              <div className="absolute top-full right-0 w-72 bg-white rounded-lg shadow-lg z-50 p-2.5">
                <h3 className="m-0 mb-2.5 text-[#2B3674] text-xs font-bold">
                  Notifications
                </h3>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="border-b border-gray-200 py-2.5"
                  >
                    <p className="m-0 text-black text-sm font-medium">
                      {notification.message}
                    </p>
                    <p className="m-0 mt-1 text-[#A3AED0] text-xs font-normal">
                      {notification.time}
                    </p>
                  </div>
                ))}
                <a
                  href="#"
                  className="block text-center text-[#4318FF] text-xs font-medium mt-2.5"
                >
                  View all Notifications
                </a>
              </div>
            )}
          </div>
          <Image
            src="/setting-2.svg"
            alt="settings"
            height={24}
            width={24}
            onClick={redirectToSettings}
            className="cursor-pointer"
          />
          <button className="border-none bg-none cursor-pointer relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <g clipPath="url(#clip0_72_2069)">
                <path
                  d="M9.95691 18C12.7329 18 15.2683 16.737 16.948 14.6675C17.1965 14.3613 16.9255 13.9141 16.5415 13.9872C12.175 14.8188 8.1651 11.4709 8.1651 7.06303C8.1651 4.52398 9.52431 2.18914 11.7334 0.931992C12.0739 0.738211 11.9883 0.221941 11.6013 0.150469C11.0589 0.0504468 10.5085 8.21369e-05 9.95691 0C4.98902 0 0.913826 4.02943 0.913826 9C0.913826 13.9706 4.98902 18 9.95691 18Z"
                  fill="#4318FF"
                />
              </g>
              <defs>
                <clipPath id="clip0_72_2069">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
