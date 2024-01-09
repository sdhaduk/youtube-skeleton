"use client";

import React from "react";
import { signInWithGoogle, signOut } from "@/utils/firebase";
import styles from "./sign-in.module.css";
import { User } from "@firebase/auth";

type Props = {
  user: User | null;
};

const SignIn = ({ user }: Props) => {
  return (
    <>
      {user ? (
        <button className={styles.signin} onClick={signOut}>
          Sign Out
        </button>
      ) : (
        <button className={styles.signin} onClick={signInWithGoogle}>
          Sign In
        </button>
      )}
    </>
  );
};

export default SignIn;
