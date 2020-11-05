const calculateTimeDiff = (time, nowTime = new Date()) => {
  // TODO x second, x minute, x hour ago 등 계산
  const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentTime = nowTime;
  const currentSecond = parseInt(currentTime.getTime() / 1000);
  const InputSecond = parseInt(time.getTime() / 1000);
  const timediff = currentSecond - InputSecond;
  console.log('timediff ', timediff);
  if (timediff < 10) {
    return 'commented now';
  }
  if (timediff < 60) {
    return `${timediff} secondes ago`;
  }
  if (timediff < 3600) {
    const min = parseInt(timediff / 60);
    if (min === 1) {
      return '1 minute ago';
    }
    return `${min} minutes ago`;
  }
  if (timediff < 3600 * 24) {
    const hour = parseInt(timediff / (60 * 60));
    if (hour === 1) {
      return '1 hour ago';
    }
    return `${hour} hours ago`;
  }
  if (timediff < 3600 * 24 * 30) {
    const day = parseInt(timediff / (60 * 60 * 24));
    if (day === 1) {
      return 'yesterday';
    }
    return `${day} days ago`;
  }
  return `Updated on ${Months[time.getMonth()]} ${time.getDate()}`;
};

describe(('go'), () => {
  const testDates = [
    {
      date: new Date('2020-10-31T23:59:59.000Z'),
      answer: 'commented now',
    },
    {
      date: new Date('2020-10-31T23:59:51.999Z'),
      answer: 'commented now',
    },
    {
      date: new Date('2020-10-31T23:59:50.000Z'),
      answer: '10 secondes ago',
    },
    {
      date: new Date('2020-10-31T23:59:49.999Z'),
      answer: '11 secondes ago',
    },
    {
      date: new Date('2020-10-31T23:58:49.999Z'),
      answer: '1 minute ago',
    },
    {
      date: new Date('2020-10-31T23:57:49.999Z'),
      answer: '2 minutes ago',
    },
    {
      date: new Date('2020-10-31T23:00:00.000Z'),
      answer: '1 hour ago',
    },
    {
      date: new Date('2020-10-31T18:00:00.000Z'),
      answer: '6 hours ago',
    },
    {
      date: new Date('2020-10-31T14:00:00.000Z'),
      answer: '10 hours ago',
    },
    {
      date: new Date('2020-10-31T00:00:00.000Z'),
      answer: 'yesterday',
    },
    {
      date: new Date('2020-10-30T01:00:00.000Z'),
      answer: 'yesterday',
    },
    {
      date: new Date('2020-10-15T18:00:00.000Z'),
      answer: '16 days ago',
    },
    {
      date: new Date('2020-07-15T00:00:00.000Z'),
      answer: 'Updated on Jul 15',
    },
  ];

  for (const a of testDates) {
    test('test', () => {
      expect(a.answer).toBe(calculateTimeDiff(a.date, new Date('2020-11-01T00:00:00.000Z')));
    });
  }
});
