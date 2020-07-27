function dateAgo(n) {
  let dateAgo = new Date();
  dateAgo.setDate(dateAgo.getDate() - n);
  return dateAgo;
}

function formatDate(date) {
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  const year = date.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};

function dating(date) {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  return `${day} ${months[month]}, ${year}`;
}

export {dateAgo, formatDate, dating};
