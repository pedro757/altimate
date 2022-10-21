import { useQuery } from "@tanstack/react-query";
import { atom, useAtom } from "jotai";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { db } from ".";

export const Table = atom("")

const Tables: NextPage = () => {
  const { data: tables } = useQuery(["tables"]);
  const [database] = useAtom(db);
  const [table, setTable] = useAtom(Table)
  const router = useRouter()

  useQuery(
    ["table", table],
    async () => {
      const res = await fetch(`http://127.0.0.1:8000/${database}/${table}`);
      if (!res.ok) throw new Error("something happened");
      return res.json();
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!table,
      onSuccess: () => {
        router.push("/schema/"+table)
      },
    }
  );

  return (
    <>
      <Head>
        <title>Altimate Tables</title>
        <meta name="description" content="Altimate take-home exercise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex h-screen w-screen flex-col items-center justify-center space-y-4">
        <h1 className="text-8xl font-bold">Tables:</h1>
        {Array.isArray(tables)
          ? tables.map((table) => (
              <h2
                key={table[0]}
                className="cursor-pointer text-4xl"
                onClick={() => setTable(table[0])}
              >
                {table}
              </h2>
            ))
          : null}
      </main>
    </>
  );
};

export default Tables;
