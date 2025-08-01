import { Socket } from "socket.io";
import { v4 as UUIDV4 } from 'uuid';
import IRoomParam from "../interfaces/IRoomParam";


 //this make a db call to get userRecord
   //the below map stores what all peers have joined
   // {1: [u1, u2,u3], 2: [p1, p2, p3]}
  const rooms: Record<string, string[] > = {}

const roomHandler = (socket: Socket) => {


  const createRoom = () => {
    const roomId: string = UUIDV4();
    //we will make that socket connection enter a new room
    socket.join(roomId);
    rooms[roomId] = []; //create a new entry for the room
    socket.emit("roomCreated", {roomId});
    console.log(`Room created with ID : ${roomId}`);
  };

// this code executed every times when a user(  creator or joinee )joins a new room
  const joinedRoom = ({ roomId, peerId }: IRoomParam) => {
    if(rooms[roomId]){
        //if the given roomId exist in memory db 
    console.log("New user has joined room ", roomId, "with  peerId as  ", peerId);
    // the moment new user joins, add peerId to the key of roomid 
       rooms[roomId].push(peerId)
       console.log("added peer to room", rooms)
       socket.join(roomId ) //make sure user join to that roomId


       //Below is for logginf purpose 
       socket.emit('getUser', {
        roomId,
        participants: rooms[roomId]
       })
    }
  };


  //we will call the above function when client emit to create-room and joinRoom events
  socket.on("createRoom", createRoom);
  socket.on("joinedRoom", joinedRoom);
};


export default roomHandler;
