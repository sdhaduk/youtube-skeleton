"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SignIn from "./SignIn";
import { onAuthStateChangedHelper } from "@/utils/firebase";
import { User } from "@firebase/auth";
import Upload from "./Upload";

type Props = {};

const Navbar = (props: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  });

  return (
    <nav className="flex justify-between items-center p-4">
      <Link href="/">
        <Image
          src="/youtube-logo.svg"
          alt="Youtube Logo"
          width={90}
          height={20}
        />
      </Link>  
      {user && <Upload />}
      <SignIn user={user} />
    </nav>
  );
};

export default Navbar;
