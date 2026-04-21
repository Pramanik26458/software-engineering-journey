// scenario 1
// ====================================================

// let apikey = "95029210600ba4fe1f2f357f98b81372";
// function getWeather(city) {
//  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`)
//         .then((raw )=> raw.json())
//         .then(result => {
//             console.log(result);
//         });
// }

// getWeather("London");

// using async await

/*
async function getWeather(city) {
  try {
let apikey = "95029210600ba4fe1f2f357f98b81372";
    let data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`,
    );
    if (!data.ok) {
      throw new Error("City not Found, Something Went Wrong");
    }
    let realdata = await data.json();
    if(realdata.main.temp<0){
        console.warn(`It's ${realdata.main.temp}°C very cold outside, Wear a jacket`);
    }
    else if(realdata.main.temp>30){
        console.error(`It's ${realdata.main.temp}°C very hot outside, Wear light clothes`);
    }
    else{
        console.log(`It's ${realdata.main.temp}°C outside, Wear comfortable clothes`);
    }

  } catch (err) {
    console.log(err.message);
  }
}

getWeather("Phalodi");

*/

// scenario 2

const user = ["pramanik@gmail.com", "swattik@gmail.com", "ram@gmail.cm"];

function sendEmail(email) {
  return new Promise((resolve, reject) => {
    let time = Math.floor(Math.random() * 10);
    setTimeout(() => {
      let probability = Math.floor(Math.random() * 10);
      if (probability < 5) {
        resolve(`Email sent to ${email} successfully`);
      } else {
        reject(`Failed to send email to ${email}`);
      }
    }, time * 1000);
  });
}

sendEmail("basak@gmail.com")
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });
async function sendEmails(userlist) {
  let allresponse = userlist.map(function (email) {
    return sendEmail(email)
      .then(function (data) {
        return data;
      })
      .catch(function (err) {
        return err;
      });
  });

  let ans = await Promise.all(allresponse);

  ans.forEach(function (status) {
    console.log(`status: ${status}`);
  });
}
sendEmails(user);
