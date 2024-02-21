const dateFormatter = (date, forHtml = false) => {
  let dateObj = new Date(date);
  let myDate = "";
  let myTime = "";
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  if (forHtml) {
    myDate = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${dateObj.getDate().toString().padStart(2, "0")}`;
    myTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  } else {
    myDate = `${(dateObj.getMonth() + 1).toString().padStart(2, "0")}/${dateObj
      .getDate()
      .toString()
      .padStart(2, "0")}/${dateObj.getFullYear()}`;
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    myTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;
  }
  return myDate + " " + myTime;
};
export default dateFormatter;
