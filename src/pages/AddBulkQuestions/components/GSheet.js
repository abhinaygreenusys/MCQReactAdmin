import { useState, useEffect } from "react";
import useGoogleSheets from "use-google-sheets";
import Button from "../../../components/common/Button";

const GSheet = ({ addBulkQuestions, structuredData, setStructuredData }) => {
  const [sheetId, setSheetId] = useState("");
  const { data, loading, error } = useGoogleSheets({
    // https://developers.google.com/workspace/guides/create-credentials
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    sheetId: sheetId,
  });

  useEffect(() => {
    const refactorData = () => {
      if (loading) return [];
      if (error) return [];
      const sheet1Data = data[0].data;
      return sheet1Data;
    };
    setStructuredData(refactorData());
  }, [data]);

  return (
    <section>
      <div className="mb-8">
        <h2 className="mb-2">Upload Questions via Google Sheets</h2>
        <ul className="list-decimal ml-6">
          <li className="text-sm">
            Please make sure that your google sheet is publicly visible (anyone
            with this link can view)
          </li>
          <li className="text-sm">Please use the following format -</li>
          <div>
            <table className="mt-2 w-full">
              <thead className="bg-white text-black">
                <th className="border font-medium p-2 text-sm text-center">
                  question
                </th>
                <th className="border font-medium p-2 text-sm text-center">
                  option1
                </th>
                <th className="border font-medium p-2 text-sm text-center">
                  option2
                </th>
                <th className="border font-medium p-2 text-sm text-center">
                  option3
                </th>
                <th className="border font-medium p-2 text-sm text-center">
                  option4
                </th>
                <th className="border font-medium p-2 text-sm text-center">
                  answer
                </th>
              </thead>
              <tbody>
                <tr>
                  <td
                    className="border text-center font-normal p-2 text-sm"
                    colSpan={6}
                  >
                    Insert your questions here
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <li className="text-sm">
            Note that data will be extracted from Sheet1 only
          </li>
        </ul>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addBulkQuestions();
        }}
      >
        <div className="mb-4">
          <div className="mb-1 flex items-center gap-2">
            <span className="font-medium">Paste your Google Sheets ID</span>
            <span className="text-sm">
              {sheetId !== "" &&
                (loading
                  ? "(Fetching data...)"
                  : error
                  ? "(Some error occurred)"
                  : `(Found ${structuredData.length} entries)`)}
            </span>
          </div>
          <input
            type="text"
            className="w-full"
            placeholder="https://docs.google.com/spreadsheets/d/[THIS-IS-THE-SHEET-ID]/"
            value={sheetId}
            onChange={(e) => setSheetId(e.target.value)}
          />
        </div>
        <div>
          <Button type="submit">Upload</Button>
        </div>
      </form>
    </section>
  );
};

export default GSheet;
