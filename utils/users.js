const Users =[]

function UserJoin(Id, UserName, Room){
    const User = {Id, UserName, Room}

    Users.push(User)

    return User
}

function GetCurrentUser(Id){
    return Users.find(User => User.Id === Id)
}

function UserLeave(Id){
    const Index = Users.findIndex(User => User.Id === Id)

    if(Index !== -1){
        return Users.splice(Index, 1)[0]
    }
}

function GetRoomUsers(Room){
    return Users.filter(User => User.Room === Room);
}

module.exports = {
  UserJoin,
  GetCurrentUser,
  UserLeave,
  GetRoomUsers
};