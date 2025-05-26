"use client";
import React from "react";
import { useState } from "react";
import { APP_TAB } from "./models/enums/AppTab";
import Image from "next/image";
import UserForm from "./components/UserForm";
import Tasks from "./components/Tasks";
import { AppProvider } from "./States/AppProvider";

export default function Home() {
  const [activeTab, setActiveTab] = useState<APP_TAB>(APP_TAB.INFO);

  const tabs = [
    { label: "Mis datos", value: APP_TAB.INFO },
    { label: "Mis tareas", value: APP_TAB.TASKS },
    { label: "Mis devoluciones", value: APP_TAB.RETURNS },
    { label: "Mis comunicaciones", value: APP_TAB.COMUNICATIONS },
    { label: "Mis mejores amigos", value: APP_TAB.FRIENDS },
  ];

  const activeTitle = tabs.find((t) => t.value === activeTab)?.label;

  return (
    <AppProvider>
      <div className="min-h-screen flex justify-center ">
        <div className="w-full bg-grey-background shadow-md">
          {/* Header */}
          <div className="w-full flex justify-between items-center px-4 py-4 border-b border-grey bg-white">
            <Image src="/icons/Menu.svg" alt="Menú" width={23} height={21} />
            <Image
              src="/icons/Search.svg"
              alt="Buscar"
              width={23}
              height={21}
            />
            <Image src="/icons/Logo.svg" alt="Logo" width={187} height={30} />
            <Image src="/icons/Login.svg" alt="Login" width={23} height={21} />
            <Image src="/icons/Cart.svg" alt="Carrito" width={23} height={21} />
          </div>

          <div className="w-full flex overflow-x-auto items-center border-b-0 shadow-sm scrollbar-hide bg-white">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`whitespace-nowrap px-3 py-4 transition-colors relative ${
                  activeTab === tab.value
                    ? "text-primary-green font-bold"
                    : "text-primary font-semibold"
                }`}
              >
                {tab.label}

                {/* Línea verde centrada */}
                {activeTab === tab.value && (
                  <div className="w-5/6 h-1 bg-primary-green absolute bottom-0 left-1/2 -translate-x-1/2 rounded-t-sm" />
                )}
              </button>
            ))}
          </div>

          {/* Info */}
          <div className="bg-grey-background px-4 py-6">
            <h1 className="text-xl text-primary font-bold mb-4">
              {activeTitle}
            </h1>
            {activeTab === APP_TAB.INFO && <UserForm />}
            {activeTab === APP_TAB.TASKS && <Tasks />}
          </div>
        </div>
      </div>
    </AppProvider>
  );
}
