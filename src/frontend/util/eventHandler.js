export default (event) => {
  // 이미지 이벤트 핸들러
  const reader = new FileReader();
  reader.onloadend = () => {
    const base64 = reader.result;
    if (base64) {
      fetch('https://api.imgur.com/3/upload', {
        method: 'POST',
        headers: {
          Authorization: 'Client-ID <client-Id>',
          Accept: 'application/json',
        },
        body: {
          image: base64.split(',')[1].toString(),
        },
      })
        .then((response) => response.json())
        .then((response) => {
          const data = `![](${response.data.link})`;
          console.log(data);
        //   setValue(value + data);
        });
    }
  };
  reader.readAsDataURL(event.target.files[0]);
};
