const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("a user connected.");

  // Add user to list of active users
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log("Id user: " + userId + " joined to party");
    // Send list of active users
    let activeUsers = users.filter((x) => x.userId != userId);
    console.log("Active without");
    console.log(activeUsers);
    io.emit("getUsers", activeUsers);
  });

  //
  socket.on("sendMessage", (userId) => {
    console.log("ping na wysylke");
    console.log(userId);
    console.log(users);
    let usersToPing = users.filter((x) => x.userId != userId);

    console.log("Users to ping");
    console.log(usersToPing);
    for (let x = 0; x < usersToPing.length; x++) {
      io.to(usersToPing[x].socketId).emit("getDataFromSrv");
    }
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
