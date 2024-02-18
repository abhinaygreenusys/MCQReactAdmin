import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Button from "../../components/common/Button";
import Selection from "./components/Selection";
import GSheet from "./components/GSheet";
import LocalFile from "./components/LocalFile";

const AddBulkQuestions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dialogRef = useRef();

  const [structuredData, setStructuredData] = useState([]);
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

  const [section, setSection] = useState("selection");

  return (
    <>
      {section === "selection" && <Selection setSection={setSection} />}
      {section === "gSheet" && (
        <GSheet
          addBulkQuestions={addBulkQuestions}
          structuredData={structuredData}
          setStructuredData={setStructuredData}
        />
      )}
      {section === "localFile" && (
        <LocalFile
          addBulkQuestions={addBulkQuestions}
          structuredData={structuredData}
          setStructuredData={setStructuredData}
        />
      )}
      <dialog
        ref={dialogRef}
        style={{
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
        }}
        className="bg-white p-4 rounded absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="text-red font-semibold">ERROR:</div>
        <p className="text-red">{errorBulk}</p>
        <p className="my-4">Upload remaining questions?</p>
        <div className="flex justify-end items-center gap-4">
          <Button
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
