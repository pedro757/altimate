import { useQuery } from "@tanstack/react-query";
import { useAtom, atom } from "jotai";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export const db = atom("")

const Home: NextPage = () => {
  const [database, setDatabase] = useAtom(db);
  const router = useRouter();
  const query = useQuery(
    ["tables"],
    async () => {
      const res = await fetch(`http://127.0.0.1:8000/${database}`);
      if (!res.ok) throw new Error("something happened");
      return res.json();
    },
    {
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: () => {
        router.push("/tables");
      },
    }
  );

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    event.preventDefault();
    setDatabase(event.currentTarget.value);
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    query.refetch()
  }

  return (
    <>
      <Head>
        <title>Altimate Connect </title>
        <meta name="description" content="Altimate take-home exercise" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen w-screen">
        <form className="flex flex-col space-y-8 p-8" onSubmit={handleSubmit}>
          <h1 className="text-center text-4xl">Database Connection</h1>
          <input
            type="text"
            placeholder="Database Name"
            className="rounded bg-gray-100 p-2"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="mx-auto w-fit rounded bg-blue-500 p-2 text-white "
          >
            Connect
          </button>
        </form>
      </main>
    </>
  );
};

export default Home;
