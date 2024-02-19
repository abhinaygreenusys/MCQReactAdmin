import { useState } from "react";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import FilesDragAndDrop from "../../components/common/FilesDragAndDrop";
import Button from "../../components/common/Button";
import { TbLoader2 } from "react-icons/tb";

const UploadTestInstructions = () => {
  const [filename, setFilename] = useState("");
  // for file upload task
  const [selectedFiles, setSelectedFiles] = useState([]);
  const onUpload = (files) => {
    console.log(files);
    setSelectedFiles(files);
    setFilename(files.map((file) => file.name).join(", "));
  };
  const [loading, setLoading] = useState(false);
  const uploadTestInstruction = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("buffer", selectedFiles[0]);
      const { data } = await api.post("/uploadTestInstruction", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      myToast(data.message, "success");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2 className="mb-8">Add Test Instruction</h2>
      <div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            uploadTestInstruction();
          }}
        >
          <div className="mb-4">
            <h5 className="mb-1">Current Instruction Video</h5>
            <video
              src="https://gyanvigyan.s3.ap-south-1.amazonaws.com/appTutorial/tutorial.mp4"
              controls
              className="w-96"
            ></video>
          </div>
          <div className="mb-4">
            <h5 className="mb-1">Add Instruction Video (mp4 only)</h5>
            <FilesDragAndDrop
              count={1}
              formats={["mp4"]}
              filename={filename}
              onUpload={onUpload}
            />
          </div>
          <div>
            <Button
              type="submit"
              className="flex items-center gap-1"
              disabled={loading}
            >
              {loading && <TbLoader2 className="animate-spin" />}
              Upload Video
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadTestInstructions;
