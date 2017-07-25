export default function (dateTime) {
  const regExp = new RegExp('T', 'g');
  const date = dateTime.replace(regExp, ' ').split('.');
  return date[0];
}
