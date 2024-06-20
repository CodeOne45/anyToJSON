"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Head from "next/head";
import Github from "../components/GitHub";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";
import Footer from "../components/Footer";
import AddItemModal from "../components/AddItemModal"; // Import the modal component
import { object } from "zod";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [desc, setDesc] = useState("");
  const [generatedDescs, setGeneratedDescs] = useState("");
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const [items, setItems] = useState([]);
  const defaultDesc = "John is 25 years old and studies computer science at university.";

  const generateDesc = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratedDescs("");
    setLoading(true);

    const format = items.reduce((acc, item: object) => {
      return { ...acc, ...item };
    }, {});

    const payload = {
      data: desc,
      format,
    };

    const response = await fetch("/api/json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;
    let result = "";

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      result += decoder.decode(value);
    }

    setGeneratedDescs(result);
    setLoading(false);
  };
  // @ts-ignore
  const handleAddItem = (item) => {
    // @ts-ignore
    setItems([...items, item]);
  };

  return (
    <div className="flex max-w-5xl mx-auto flex-col items-center justify-center py-2 min-h-screen">
      <Head>
        <title>anyToJSON</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-2 sm:mt-4">
        <div className="flex items-center">
          <Image src="/Logo_anyToJSON.png" width={100} height={100} alt="anyToJSON Logo" />
          <h3 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-4">anyToJSON</h3>
        </div>

        <div className="flex flex-wrap justify-center space-x-5 mt-6">
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm text-gray-600 shadow-md transition-colors hover:bg-gray-100 mb-5"
            href="https://github.com/CodeOne45/anyToJSON"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <p>Star on GitHub</p>
          </a>
        </div>
        <h1 className="sm:text-3xl text-2xl max-w-1xl font-bold text-slate-900">
          Convert any unstructured data to structured JSON.
        </h1>
        <div className="max-w-xl w-full">
          <div className="flex mt-4 items-center space-x-3 mb-3">
            <Image src="/1-black.png" width={30} height={30} alt="1 icon" />
            <p className="text-left font-medium">Write your data.</p>
          </div>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={4}
            className="w-full rounded-md border-black-500 shadow-sm focus:border-black focus:ring-black my-2"
            placeholder={"e.g. " + defaultDesc}
          />
          <div className="flex mb-5 items-center space-x-3">
            <Image src="/2-black.png" width={30} height={30} alt="2 icon" />
            <p className="text-left font-medium">Add format.</p>
          </div>
          <button
              onClick={() => setModalOpen(true)}
              className="px-2 py-1  border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 w-full"
            >
              +
            </button>
          <div className="bg-gray mt-4 p-4 hover:bg-gray-100 transition text-left" >
            {items.length > 0 && (
              <button
                className="bg-red-500 text-white font-medium px-4 py-2 rounded-md hover:bg-red-600 float-right"
                onClick={() => setItems([])}
              >
                Clear
              </button>
            )}
            <ul className="mt-4">
              {items.map((item, index) => (
                <li key={index} className="p-2 border border-gray-300 rounded-md mb-2">
                  <pre>{JSON.stringify(item, null, 2)}</pre>
                </li>
              ))}
            </ul>
          </div>
          {!loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-4 mt-3 hover:bg-black/80 w-full"
              onClick={generateDesc}
            >
              Convert &rarr;
            </button>
          )}
          {loading && (
            <button
              className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-4 mt-3 w-full"
              disabled
            >
              <LoadingDots color="white" style="large" />
            </button>
          )}
        </div>
        <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 2000 }} />
        <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="space-y-10 my-4">
              {generatedDescs && (
                <>
                  <div>
                    <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                      Your structured data
                    </h2>
                  </div>
                  <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto whitespace-pre-wrap">
                    <div
                      className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border text-left"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedDescs);
                        toast("Data copied to clipboard", {
                          icon: "✂️",
                        });
                      }}
                    >
                      <pre>{JSON.stringify(JSON.parse(generatedDescs), null, 2)}</pre>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
        
      </main>
      <Footer />
      <AddItemModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onAdd={handleAddItem} />
    </div>
  );
}
