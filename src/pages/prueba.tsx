import Head from "next/head";
import { Inter } from "next/font/google";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import styles from "@/styles/Home.module.css";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { FormEvent, useCallback, useState } from "react";

const inter = Inter({ subsets: ["latin"] });


const prueba = () => {
  return (
    <div>prueba</div>
  )
}

export default prueba