import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../components/utils/api";
import Button from "../../components/common/Button";

const CategoryQRCode = () => {
  const { id } = useParams();
  const [qr, setQR] = useState(null);
  const [date, setDate] = useState(() => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    return defaultDate;
  });
  const getQR = async () => {
    try {
      const { data } = await api.post(
        "/qr/" + id,
        {
          date,
        },
        {
          responseType: "blob", // instruct axios to return data as Blob
        }
      );
      setQR(data);
    } catch (err) {
      console.log(err);
      alert(err?.response?.data?.message || "Something went wrong!");
    }
  };

  if (!id) {
    return (
      <div>
        <h1>Invalid Category ID</h1>
      </div>
    );
  }
  return (
    <div>
      <div className="mb-8">
        <h2>Category QR Page Generation</h2>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getQR();
        }}
        className="flex gap-2 items-center"
      >
        <div className="flex items-center gap-2">
          <label htmlFor="date" className="font-medium">
            Expiry Date
          </label>
          <input
            type="date"
            id="date"
            value={date.toISOString().split("T")[0]}
            onChange={(e) => setDate(new Date(e.target.value))}
          />
        </div>
        <Button type="submit">Generate QR Code</Button>
      </form>
      {qr && (
        <div>
          <img src={URL.createObjectURL(qr)} alt="QR Code" className="w-64" />
          <Button
            type="button"
            theme="blue"
            className="w-64"
            onClick={() => {
              // save svg as image
              const a = document.createElement("a");
              a.href = URL.createObjectURL(qr);
              a.download = "qr.png";
              a.click();
            }}
          >
            Save as Image
          </Button>
        </div>
      )}
    </div>
  );
};

export default CategoryQRCode;
