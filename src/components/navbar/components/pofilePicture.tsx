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
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../../../stores/auth";

const PofilePicture = () => {
  const router = useRouter();
  const { user, clearAuth } = useAuthStore();

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
              src={user?.profilePict || "/logo/logo.svg"}
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
              <DropdownMenuItem>My Ticket</DropdownMenuItem>
              <DropdownMenuItem>Transaction</DropdownMenuItem>
            </DropdownMenuGroup>
            {user?.role === "ADMIN" && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>Organization</DropdownMenuItem>
                </DropdownMenuGroup>
              </>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={clearAuth}>Log out</DropdownMenuItem>
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
