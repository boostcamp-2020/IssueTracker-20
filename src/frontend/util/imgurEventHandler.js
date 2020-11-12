export default function imgurHandler(file) {
  return new Promise((resolve) => {
    let tryCount = 0;
    const reader = new FileReader();
    // eslint-disable-next-line consistent-return
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        const fetchImgur = fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            Authorization: 'Client-ID 693d1faa8a61999',
            Accept: 'application/json',
          },
          body: base64.split(',')[1].toString(),
        });
        fetchImgur
          .then((response) => response.json())
          .then((response) => {
            if (!response.success) {
              tryCount++;
              if (tryCount < 3) return fetchImgur();
              return '![imgur 서버 요청이 실패했습니다.]()';
            }
            const data = `![${file.name}](${response.data.link})`;
            return resolve(data);
          })
          .catch((err) => {
            tryCount++;
            if (tryCount < 3) return fetchImgur();
            return '![imgur 서버 요청이 실패했습니다.]()';
          });
      }
    };
    reader.readAsDataURL(file);
  });
}
