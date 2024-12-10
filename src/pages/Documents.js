import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Documents = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const section = location.state?.section || "terms-of-service";

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
    <div className="flex h-screen">
      <div className="w-1/4 bg-rose text-cream p-6">
        <h2 className="text-3xl font-semibold mb-4 flex justify-center underline">
          Documents
        </h2>
        <ul className="space-y-4">
          <li
            className={`cursor-pointer ${
              section === "document-1" ? "font-bold" : ""
            }`}
            onClick={() =>
              navigate("/documents", { state: { section: "document-1" } })
            }
          >
            Document 1.pdf
            <hr className="my-1 border-cream opacity-50" />
          </li>
          <li
            className={`cursor-pointer ${
              section === "document-2" ? "font-bold" : ""
            }`}
            onClick={() =>
              navigate("/documents", { state: { section: "document-2" } })
            }
          >
            Document 2.pdf
            <hr className="my-1 border-cream opacity-50" />
          </li>
        </ul>
      </div>

      <div className="w-3/4 p-6">
        <div className="text-center text-cream mt-6">{renderDocuments()}</div>
      </div>
    </div>
  );
};
