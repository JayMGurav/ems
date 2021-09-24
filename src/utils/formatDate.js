function formatDate(date) {
  const dateObj = new Date(date),
    mm = dateObj.getMonth() + 1,
    dd = dateObj.getDate(),
    yyyy = dateObj.getFullYear();
  return `${yyyy}-${mm < 10 ? "0" + mm : mm}-${dd < 10 ? "0" + dd : dd}`;
}

export default formatDate;
