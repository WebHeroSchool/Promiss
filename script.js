const body = document.body;
const content = document.querySelector('.content');
const preloader = document.querySelector('.loadingio-spinner-spinner-zsfrfdav2ln');
const url = window.location.toString();
const nickFromUrl = (url) => {
  let urlSplit = url.split('=');
  let userName = urlSplit[1];
  if (userName == undefined) {
    userName = 'akartynnik';
  }
  return userName;
}

const nick = nickFromUrl(url);

const getDate = new Promise((resolve, reject) => {
  setTimeout(() => new Date ? resolve(new Date) : reject(new Error('Время неизвестно')), 1000);
});
const getDataUser = fetch(`https://api.github.com/users/${nick}`);

const preloaderHide = () => {
  preloader.style.display = 'none';
  content.style.display = 'block';
}

setTimeout(preloaderHide, 2000);



Promise.all([getDataUser, getDate])
  .then(([userData, nowDate]) => {
    data = userData;
    date = nowDate;
  })
  .then(res => data.json())
  .then(json => {
    if (json.login != undefined) {
      const avatarAdd = () => {
        const img = document.createElement('img');
        img.src = json.avatar_url;
        content.append(img);
      }

      const nameAdd = () => {
        const h1 = document.createElement('h1');
        if (name === null) {
          const nickName = json.login;
          h1.innerHTML = nickName;
          content.append(h1);
        } else {
          const name = json.name;
          h1.innerHTML = name;
          content.append(h1);
        }
      }

      const  bioAdd = () => {
        const p = document.createElement('p');
        p.innerHTML = json.bio;
        content.append(p);
      }

      const linkAdd = () => {
        const link = document.createElement('a');
        link.href = json.html_url;
        link.innerHTML = 'Link';
        content.append(link);
      }

      const dateAdd = () => {
        const p = document.createElement('p');
        p.innerHTML = date;
        content.append(p);
      }

      nameAdd();
      avatarAdd();
      bioAdd();
      linkAdd();
      dateAdd();
    } else {
      alert("Информация о пользователе не доступна");
    }
  })
  .catch(err => alert(err));