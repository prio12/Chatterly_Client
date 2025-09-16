async function getOrCreateConversation({
  socket,
  createConversation,
  conversationId,
  user1,
  user2,
} = {}) {
  //*start here

  //prepare the participants
  const participantsData = { participants: [] };
  if (user1 && user2) {
    participantsData.participants.push(user1, user2);
  }

  if (!conversationId && participantsData.participants?.length === 2) {
    console.log('hitting api');
    await createConversation(participantsData);
    //TODO: here to receive the conversationId from server then emit the event with conversationId
  } else {
    console.log('emitting event without hitting api');
    socket.emit('joinRoom', conversationId);
  }
}

export default getOrCreateConversation;
