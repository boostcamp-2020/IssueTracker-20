export const calculateTimeDiff = (times, nowTime = new Date()) => {
  const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const time = new Date(times);
  const currentTime = nowTime;
  const currentSecond = Math.floor(currentTime.getTime() / 1000);
  const InputSecond = Math.floor(time.getTime() / 1000);
  const timediff = currentSecond - InputSecond;

  if (timediff < 10) {
    return 'commented now';
  }
  if (timediff < 60) {
    return `${timediff} secondes ago`;
  }
  if (timediff < 3600) {
    const min = Math.floor(timediff / 60);
    if (min === 1) {
      return '1 minute ago';
    }
    return `${min} minutes ago`;
  }
  if (timediff < 3600 * 24) {
    const hour = Math.floor(timediff / (60 * 60));
    if (hour === 1) {
      return '1 hour ago';
    }
    return `${hour} hours ago`;
  }
  if (timediff < 3600 * 24 * 30) {
    const day = Math.floor(timediff / (60 * 60 * 24));
    if (day === 1) {
      return 'yesterday';
    }
    return `${day} days ago`;
  }
  return `Updated on ${Months[time.getMonth()]} ${time.getDate()}`;
};

export const calculateDummy = () => {
  const res = 'export 2개 이상 만들지 않으면 linterror가 생겨 만든 더미 메소드';
  return res;
};
