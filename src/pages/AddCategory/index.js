import { useState } from "react";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Button from "../../components/common/Button";
import FilesDragAndDrop from "../../components/common/FilesDragAndDrop";
import { TbLoader2 } from "react-icons/tb";

const AddCategory = () => {
    const [newCategoryName, setNewCategoryName] = useState("");
    const [filename, setFilename] = useState("");
    // for file upload task
    const [selectedFiles, setSelectedFiles] = useState([]);
    const onUpload = (files) => {
      console.log(files);
      setSelectedFiles(files);
      setFilename(files.map((file) => file.name).join(", "));
    };
    const [loading, setLoading] = useState(false);
    const addCategory = async () => {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append("name", newCategoryName);
        formData.append("url", selectedFiles[0]);
        const { data } = await api.post("/addCategory", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(data);
        setNewCategoryName("");
        setSelectedFiles([]);
        setFilename("");
        myToast(data.message, "success");
      } catch (err) {
        console.log(err);
        myToast(err?.response?.data?.error || "Something went wrong", "failure");
      }
      setLoading(false);
    };
  return (
    <section>
      <div className="mb-8">
        <h5>Add a new Category</h5>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addCategory();
        }}
      >
        <div className="mb-4">
          <div className="mb-1">Category Name</div>
          <input
            type="text"
            className="w-full"
            placeholder="Enter category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <div className="mb-1">Category Video (mp4 only)</div>
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
            Add Category
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddCategory;
