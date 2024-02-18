import React from "react";
import Button from "../../../components/common/Button";
import { PiMicrosoftExcelLogoFill } from "react-icons/pi";
import { SiGooglesheets } from "react-icons/si";

const Selection = ({ setSection }) => {
  return (
    <section>
      <div className="mb-8">
        <h2 className="mb-2">Upload Questions in Bulk</h2>
        <p className="text-sm">
          Our system supports bulk upload of questions via spreadsheets
        </p>
      </div>
      <div className="font-medium mb-2">
        Please select upload medium to add questions in bulk
      </div>
      <div className="flex gap-4">
        <Button
          theme="blue"
          className="flex gap-1 items-center"
          onClick={() => {
            setSection("gSheet");
          }}
        >
          <SiGooglesheets />
          Google Sheets File
        </Button>
        <Button
          theme="blue"
          className="flex gap-1 items-center"
          onClick={() => {
            setSection("localFile");
          }}
        >
          <PiMicrosoftExcelLogoFill />
          Microsoft Excel File
        </Button>
      </div>
    </section>
  );
};

export default Selection;
