import React, { useState, useEffect } from "react";

export const Documents = () => {
  const [section, setSection] = useState("document-1");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [section]);

  const renderDocuments = () => {
    switch (section) {
      case "document-1":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Lab Results</h1>
            <hr className="my-8 border-cream opacity-50" />
            <iframe
              src="https://19january2021snapshot.epa.gov/sites/static/files/2018-10/documents/placeholder_pdf.pdf"
              width="100%"
              height="700px"
              title="Lab Results"
            />
          </div>
        );
      case "document-2":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Document Header 2</h1>
            <hr className="my-8 border-cream opacity-50" />
            <iframe
              src="https://19january2021snapshot.epa.gov/sites/static/files/2018-10/documents/placeholder_pdf.pdf"
              width="100%"
              height="700px"
              title="Document 2"
            />
          </div>
        );
      default:
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Document Not Found</h1>
            <hr className="my-8 border-cream opacity-50" />
            <p>The requested document could not be found.</p>
          </div>
        );
    }
  };

  return (
    <div
      className="flex flex-col md:flex-row min-h-screen bg-charcoal text-cream
                 px-6 md:px-[16.15vw] py-6 md:py-12 gap-8"
    >
      <aside className="w-full md:w-1/3">
        <h2 className="text-3xl font-semibold mb-4 flex justify-center underline">
          Documents
        </h2>
        <ul className="space-y-6 md:space-y-16 text-base md:text-[25px] hover:cursor-pointer">
          <li
            className={`${
              section === "document-1" ? "font-bold" : "text-cream"
            }`}
            onClick={() => setSection("document-1")}
          >
            Document 1.pdf
          </li>
          <li
            className={`${
              section === "document-2" ? "font-bold" : "text-cream"
            }`}
            onClick={() => setSection("document-2")}
          >
            Document 2.pdf
          </li>
        </ul>
      </aside>

      <main className="flex-1 text-base md:text-[20px]">
        {renderDocuments()}
      </main>
    </div>
  );
};
