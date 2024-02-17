import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGoogleSheets from "use-google-sheets";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Button from "../../components/common/Button";

const AddBulkQuestions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dialogRef = useRef();

  const [sheetId, setSheetId] = useState("");
  const { data, loading, error } = useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    sheetId: sheetId,
  });

  const [structuredData, setStructuredData] = useState([]);
  useEffect(() => {
    const refactorData = () => {
      if (loading) return [];
      if (error) return [];
      const sheet1Data = data[0].data;
      return sheet1Data;
    };
    setStructuredData(refactorData());
  }, [data]);

  const [errorBulk, setErrorBulk] = useState();
  const addBulkQuestions = async (flag = false) => {
    if (structuredData.length === 0) {
      myToast("Please enter atleast 1 question", "failure");
      return;
    }
    try {
      const { data } = await api.post(
        `/uploadBulkQuestions?uploadValidFlag=${flag}`,
        {
          categoryId: id,
          questions: structuredData,
        }
      );
      console.log(data);
      myToast(data.message, "success");
      setErrorBulk("");
      if (flag) dialogRef.current.close();
      navigate("/manage-categories");
    } catch (err) {
      console.log(err);
      if (err?.response?.status !== 500) {
        setErrorBulk(err?.response?.data?.error);
        dialogRef.current.show();
      }
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  return (
    <>
      <section>
        <div className="mb-8">
          <h2 className="mb-2">Upload Questions via Google Sheets</h2>
          <ul className="list-decimal ml-6">
            <li className="text-sm">
              Please make sure that your google sheet is publicly visible
              (anyone with this link can view)
            </li>
            <li className="text-sm">Please use the following format -</li>
            <div>
              <table className="mt-2 w-full">
                <thead className="bg-white text-black">
                  <th className="border font-medium p-2 text-sm text-center">question</th>
                  <th className="border font-medium p-2 text-sm text-center">option1</th>
                  <th className="border font-medium p-2 text-sm text-center">option2</th>
                  <th className="border font-medium p-2 text-sm text-center">option3</th>
                  <th className="border font-medium p-2 text-sm text-center">option4</th>
                  <th className="border font-medium p-2 text-sm text-center">answer</th>
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
      <dialog
        ref={dialogRef}
        className="bg-white p-4 rounded shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="text-red font-semibold">ERROR:</div>
        <p className="text-red">{errorBulk}</p>
        <p className="my-4">Upload remaining questions?</p>
        <div className="flex justify-end items-center">
          <Button
            className="mr-2"
            theme="grey"
            onClick={() => dialogRef.current.close()}
          >
            Cancel
          </Button>
          <Button theme="blue" onClick={() => addBulkQuestions(true)}>
            Upload
          </Button>
        </div>
      </dialog>
    </>
  );
};

export default AddBulkQuestions;
