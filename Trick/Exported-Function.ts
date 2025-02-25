export function getDateInfo() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const formatDate = (date: Date) => {
    const day = date.getDate();
    const month = date.toLocaleString('en-UK', { month: 'short' });
    const year = date.getFullYear();
    return `${day}${month},${year}`;
  };

  return {
    today: formatDate(today),
    tomorrow: formatDate(tomorrow),
  };
}


console.log(getDateInfo().today)
console.log(getDateInfo().tomorrow)
