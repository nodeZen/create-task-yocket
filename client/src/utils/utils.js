export const covertCamlinToNormal = (camlinText) => {
  var result = camlinText.replace(/([A-Z])/g, " $1");
  var finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

const getMonthsList = () => {
  return [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
};
export const getLocalDate = (date) => {
  if (date) {
    const onlyDate = date.split(/[T ]/)[0];
    const dt = new Date(onlyDate);
    const months = getMonthsList();
    return `${
      months[dt.getUTCMonth()]
    }- ${dt.getUTCDate()}- ${dt.getUTCFullYear()}`;
  }
  return "";
};


export const getTense=(date)=> {
  const enteredDate = new Date(date);
  const today = new Date();
  let tense = 0; //present
  enteredDate.setHours(0,0,0,0);
  today.setHours(0,0,0,0);
  if(enteredDate<today) tense=-1;
  if(enteredDate>today) tense = 1;
  return tense;
  
}