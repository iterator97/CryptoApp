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
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);

    // Send list of active users
    let activeUsers = users.filter((x) => x.userId != userId);
    io.emit("getUsers", activeUsers);
  });

  socket.on("sendMessage", (userId) => {
    let usersToPing = users.filter((x) => x.userId != userId);

    for (let x = 0; x < usersToPing.length; x++) {
      io.to(usersToPing[x].socketId).emit("getDataFromSrv");
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});
