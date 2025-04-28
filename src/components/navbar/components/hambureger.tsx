"use client";

import React, { useState } from "react";
import { useAuthStore } from "../../../stores/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const Hamburger = () => {
  const { user, clearAuth } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex gap-4 text-black md:hidden">
      <Link
        href="/cart"
        className="aspect-square h-full text-black hover:scale-110 hover:cursor-pointer"
      >
        <ShoppingCart size={35} />
      </Link>
      <button
        onClick={toggleMenu}
        className="relative z-20 flex h-8 w-8 flex-col items-center justify-center space-y-1"
        aria-label="Toggle Menu"
      >
        <div
          className={`h-0.5 w-6 bg-black transition-transform ${isOpen ? "translate-y-1.5 rotate-45" : ""}`}
        />
        <div
          className={`h-0.5 w-6 bg-black transition-opacity ${isOpen ? "opacity-0" : ""}`}
        />
        <div
          className={`h-0.5 w-6 bg-black transition-transform ${isOpen ? "-translate-y-1.5 -rotate-45" : ""}`}
        />
      </button>
      {isOpen && (
        <section
          onClick={toggleMenu}
          className="fixed top-0 right-0 bottom-0 left-0 z-10 container h-screen w-screen flex-col items-center justify-center space-y-2 bg-white/80 backdrop-blur-sm"
        >
          <div className="grid w-screen rounded-md bg-white px-[5%] pt-[50px] shadow-md">
            {!!user ? (
              <div className="mb-4">
                <div className="relative mx-auto aspect-square w-1/3">
                  <Image
                    src={user?.profilePict || "/logo/logo.svg"}
                    alt="Profile"
                    fill
                    quality={40}
                  />
                </div>
                <p className="text-center text-2xl font-bold text-black">
                  {user?.username}
                </p>
              </div>
            ) : (
              <div className="grid gap-2 py-4">
                <Link
                  href="/login"
                  className="mx-auto w-9/10 font-bold items-center rounded-xl bg-[#008ddc] p-2 text-center text-white shadow-md"
                >
                  LOGIN
                </Link>
                <Link
                  href="/register"
                  className="mx-auto w-9/10 font-bold items-center rounded-xl bg-[#0e5487] p-2 text-center text-white shadow-md"
                >
                  REGISTER
                </Link>
              </div>
            )}
          </div>
          {user && (
            <>
              <Link
                href="/profile"
                className="mx-auto flex w-9/10 items-center rounded-xl bg-white p-2 pl-10 shadow-md"
              >
                Profile
              </Link>
              <Link
                href="/my-ticket"
                className="mx-auto flex w-9/10 items-center rounded-xl bg-white p-2 pl-10 shadow-md"
              >
                My Ticket
              </Link>
              <Link
                href="/my-transaction"
                className="mx-auto flex w-9/10 items-center rounded-xl bg-white p-2 pl-10 shadow-md"
              >
                My Transaction
              </Link>
              {user?.role === "ADMIN" && (
                <Link
                  href="/organization"
                  className="mx-auto flex w-9/10 items-center rounded-xl bg-white p-2 pl-10 shadow-md"
                >
                  My Organization
                </Link>
              )}
            </>
          )}
          <Link
            href="/"
            className="mx-auto flex w-9/10 items-center rounded-xl bg-white p-2 pl-10 shadow-md"
          >
            Explore
          </Link>
          <Link
            href="/"
            className="mx-auto flex w-9/10 items-center rounded-xl bg-white p-2 pl-10 shadow-md"
          >
            About Us
          </Link>
          <Link
            onClick={clearAuth}
            href="/"
            className="mx-auto flex w-9/10 items-center rounded-xl bg-white p-2 pl-10 shadow-md"
          >
            Logout
          </Link>
        </section>
      )}
    </div>
  );
};

export default Hamburger;
