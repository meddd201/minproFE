"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DEFAULT_EMPTY_PROFILE_IMAGE } from "@/config/env";
import { ShoppingCart } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PofilePicture = () => {
  const router = useRouter();
  const session = useSession();
  const user = session?.data?.user;

  const profileSrc =
    user?.profilePict === "null" || !user?.profilePict
      ? DEFAULT_EMPTY_PROFILE_IMAGE
      : user?.profilePict;

  const logout = () => {
    signOut({ redirectTo: "/" });
  };

  if (user) {
    return (
      <div className="hidden items-center gap-4 text-black hover:cursor-pointer md:flex">
        <Link
          href="/cart"
          className="aspect-square h-full text-black hover:scale-110 hover:cursor-pointer"
        >
          <ShoppingCart size={35} />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src={profileSrc}
              alt="Profile"
              width={50}
              height={50}
              quality={10}
              className="aspect-square h-full rounded-full border-2 border-black transition-transform duration-300 hover:scale-110"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  router.push("/profile");
                }}
              >
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem  onClick={() => {
                  router.push("/my-ticket");
                }}>My Ticket</DropdownMenuItem>
              <DropdownMenuItem>Transaction</DropdownMenuItem>
            </DropdownMenuGroup>
            {user?.role === "ADMIN" && (
              <Link href="/organization">
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Organization</DropdownMenuItem>
                </DropdownMenuGroup>
              </Link>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  } else {
    return (
      <div className="hidden items-center gap-2 text-black md:grid md:grid-cols-2">
        <Button
          className="hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black"
          type="button"
          onClick={() => router.push("/login")}
        >
          login
        </Button>
        <Button
          className="hover:border-3 hover:border-black hover:bg-amber-500 hover:text-2xl hover:text-black"
          type="button"
          onClick={() => router.push("/register")}
        >
          register
        </Button>
      </div>
    );
  }
};

export default PofilePicture;
