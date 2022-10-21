import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { useQuery } from "@tanstack/react-query";

const Schema: NextPage = () => {
  const {
    query: { id },
  } = useRouter();
  const { data } = useQuery(["table", id]);

  return (
    <>
      <Head>
        <title>Altimate Tables</title>
        <meta name="description" content="Altimate take-home exercise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">{id} Schema</h1>
        {Array.isArray(data)
          ? data.map((col) => {
              const col_name = col[1];
              const type = col[2];
              return (
                <h3 key={col_name}>
                  {col_name} : {type}
                </h3>
              );
            })
          : null}
      </main>
    </>
  );
};

export default Schema;
