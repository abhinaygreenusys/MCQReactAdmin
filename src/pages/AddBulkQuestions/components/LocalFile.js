import { useState } from "react";
import { read, utils } from "xlsx";
import Button from "../../../components/common/Button";
import FilesDragAndDrop from "../../../components/common/FilesDragAndDrop";

const LocalFile = ({ addBulkQuestions, structuredData, setStructuredData }) => {
  const [filename, setFilename] = useState("");
  // for file upload task
  const onUpload = (files) => {
    setFilename(files[0].name);
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const sheetData = utils.sheet_to_json(sheet);
      setStructuredData(sheetData);
    };
    reader.readAsArrayBuffer(files[0]);
  };
  return (
    <section>
      <div className="mb-8">
        <h2 className="mb-2">Upload Questions via Local Spreadsheet</h2>
        <ul className="list-decimal ml-6">
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
            <span className="font-medium">
              Upload a local Microsoft Excel file
            </span>
            {filename && (
              <span className="text-sm">
                Found {structuredData.length} entries
              </span>
            )}
          </div>
          <FilesDragAndDrop
            count={1}
            formats={["xlsx"]}
            filename={filename}
            onUpload={onUpload}
          />
        </div>
        <div>
          <Button type="submit">Upload</Button>
        </div>
      </form>
    </section>
  );
};

export default LocalFile;
