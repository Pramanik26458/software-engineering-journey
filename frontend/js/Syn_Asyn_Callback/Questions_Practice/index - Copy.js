// Q1

// function after(delay, callback) {
//   setTimeout(() => {
//     callback();
//   },delay);
// }

// after(3000, () => {
//   console.log("CallBack after 3 seconds");
// });


// Q2


// function getUser(id, callback) {
// console.log("getting user deatils from database...");
//     setTimeout(() => {
//         callback({ id:124, username: "Ram"});
//     }, 1000);

// }

// function getUserPost(userId, callback) {
//     console.log("getting user post from database...");
//     setTimeout(() => {
//         callback(["Post1", "Post2", "Post3"]);
//     }, 1000);
// }

// getUser(124, function (user) {
//     console.log(user);
//     getUserPost(user.id, (posts) => {
//         console.log(posts);
//     }
//     );
// });



// Q3

function loginUser(username,cb){
    console.log("Login user...");
    setTimeout(() => {
        cb({username:"Basak8754"});
    }, 1000);
}
function fetchPermissions(user,cb){
    console.log("Fetching permissions...");
    setTimeout(() => {
        cb(["Admin", "Editor"]);
    }, 1500);
}
function loadDashboard(user,permissions,cb){
    console.log("Loading dashboard for user:", user);
    console.log("Permissions:", permissions);
    cb();
}



loginUser("Basak8754", (user) => {
    fetchPermissions(user, (permissions) => {
        loadDashboard(user, permissions, () => {
            console.log("Dashboard loaded successfully! ✔️");
        });
    });
});


