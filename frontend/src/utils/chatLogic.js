import Usercomponent from "../components/Usercomponent";

export const getSender = (loggeduser, users) => {
  return users[0]._id === loggeduser._id ? (
    <Usercomponent users={users[1]} />
  ) : (
    <Usercomponent users={users[0]} />
  );
};
export const isSamesender = (message, currentmessage, currentIndex, userID) => {
  return (
    currentIndex < message.length - 1 &&
    (message[currentIndex + 1].sender._id !== currentmessage.sender._id ||
      message[currentIndex + 1].sender._id === undefined) &&
    message[currentIndex] !== userID
  );
};
export const isLastmessage = (message, currentIndex, userID) => {
  return (
    currentIndex === message.length - 1 &&
    message[message.length - 1].sender._id === userID &&
    message[message.length - 1].sender._id
  );
};
export const isSamesendermargin = (
  message,
  currentmessage,
  currentIndex,
  userID
) => {
  if (
    currentIndex < message.length - 1 &&
    message[currentIndex + 1].sender._id === currentmessage.sender._id &&
    message[currentIndex].sender._id !== userID
  ) {
    return "flex-start";
  } else if (
    (currentIndex < message.length - 1 &&
      message[currentIndex + 1].sender._id !== currentmessage.sender._id  &&
      message[currentIndex].sender._id !== userID) ||
    (currentIndex === message.length - 1 &&
      message[currentIndex].sender._id !== userID)
  ) {
    return "flex-start";
  } else {
    return "flex-end";
  }
};
export const isSameuser=(message, currentIndex,currentmessage )=>{
  return currentIndex > 0 && message[currentIndex-1].sender._id ===currentmessage.sender._id
}