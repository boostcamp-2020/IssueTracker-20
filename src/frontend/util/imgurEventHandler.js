export default function imgurHandler(event) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    // eslint-disable-next-line consistent-return
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            Authorization: 'Client-ID 693d1faa8a61999',
            Accept: 'application/json',
          },
          body: base64.split(',')[1].toString(),
        })
          .then((response) => response.json())
          .then((response) => {
            const data = `![](${response.data.link})`;
            resolve(data);
          });
      }
    };
    reader.readAsDataURL(event.target.files[0]);
  });
}
