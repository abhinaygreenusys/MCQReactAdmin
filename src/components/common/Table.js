import React from "react";
import "./table.scss";

const Table = ({
  tHead = [],
  wrapperClass = "",
  loading = false,
  children,
}) => {
  return (
    <div className={`w-full overflow-x-auto ${wrapperClass}`}>
      <table className="w-full">
        <thead>
          <tr>
            {tHead.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={tHead.length} className="text-center">
                Loading...
              </td>
            </tr>
          ) : (
            children
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
