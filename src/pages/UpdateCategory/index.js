import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Button from "../../components/common/Button";
import FilesDragAndDrop from "../../components/common/FilesDragAndDrop";
import { TbLoader2 } from "react-icons/tb";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineLink } from "react-icons/ai";

const UpdateCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [categoryName, setCategoryName] = useState("");
  const [categoryUrls, setCategoryUrls] = useState([]);

  const getCategory = async () => {
    try {
      const { data } = await api.get("/getCategory/" + id);
      console.log(data);
      setCategoryName(data.result.name);
      setCategoryUrls(data.result.urls);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  const handleDelete = async (url) => {
    try {
      const { data } = await api.patch("/deleteCategoryUrl/" + id, { url });
      console.log(data);
      setCategoryUrls(categoryUrls.filter((item) => item !== url));
      myToast(data.message, "success");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  const [filename, setFilename] = useState("");
  // for file upload task
  const [selectedFiles, setSelectedFiles] = useState([]);
  const onUpload = (files) => {
    console.log(files);
    setSelectedFiles(files);
    setFilename(files.map((file) => file.name).join(", "));
  };
  const [loading, setLoading] = useState(false);
  const updateCategory = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("url", selectedFiles[i]);
      }
      const { data } = await api.patch("/updateCategory/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(data);
      myToast(data.message, "success");
      navigate("/manage-categories");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
    setLoading(false);
  };

  return (
    <section>
      <div className="mb-8">
        <h2>Update Category</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateCategory();
        }}
      >
        <div className="mb-4">
          <div className="mb-1">Category Name</div>
          <input
            type="text"
            className="w-full"
            placeholder="Enter category name"
            value={categoryName}
            disabled
          />
        </div>
        <div className="mb-4">
          <div className="mb-1">Current assets</div>
          <div className="my-4">
            {categoryUrls.length > 0 ? (
              categoryUrls.map((item) => (
                <div
                  className="flex justify-between items-center mb-2 bg-lightgrey px-4 rounded-sm"
                  key={item}
                >
                  <a
                    href={`${process.env.REACT_APP_BASE_VIDEO_URL}/${item}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-theme flex items-center gap-2"
                  >
                    <AiOutlineLink />
                    {item}
                  </a>
                  <span
                    className="p-2 pr-0 cursor-pointer"
                    onClick={() => handleDelete(item)}
                  >
                    <MdDeleteOutline />
                  </span>
                </div>
              ))
            ) : (
              <p>No assets found</p>
            )}
          </div>
        </div>
        <div className="mb-4">
          <div className="mb-1">Add New Category Assets</div>
          <FilesDragAndDrop
            count={999}
            formats={[
              "png",
              "jpg",
              "jpeg",
              "mp4",
              "pdf",
              "docx",
              "pptx",
              "mp3",
            ]}
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
            Update Category
          </Button>
        </div>
      </form>
    </section>
  );
};

export default UpdateCategory;
