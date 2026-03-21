// promise
// async/await
// settimeout
// setinterval

const prem = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 2000);
});

prem
  // for resolved i mean it will execute when the promise has resolved
  .then(function () {
    console.log("resolved suessfull");
  })

  // for rejected
  .catch(function () {
    console.log("rejected");
  });

// api calling

fetch(`https://randomuser.me/api/`)
  .then(function (notreadbledata) {
    return notreadbledata.json();
  })

  .then(function (readbledata) {
    console.log(readbledata.results[0].name.first);
  })
  .catch(function (err) {
    console.log(err);
  });

// in sort

fetch(`https://randomuser.me/api/`)
  .then((res) => res.json())
  .then((data) => console.log(data.results[0].name.first))
  .catch((err) => console.log(err));



//  async await

function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let num = Math.floor(Math.random() * 10);
      
      if (num > 5) {
        resolve("success");
      } else {
        reject("failure");
      }
    }, 2000);
  });
}

async function callData() {
  try {
    let v = await getData();
    console.log(v);
  } catch (error) {
    console.log(error);
  }
}

callData();
