import * as socket from "socket.io";


export const socketConnect = (server: any) => {

    const io: socket.Server = new socket.Server(server);

 
    let socketsConnected = new Set();

    function onConnected(sk: any) {
        console.log('Socket connected: ', sk.id);
        socketsConnected.add({ skId: sk.id, userId: '' });
        console.log(socketsConnected);


        sk.on('disconnect', () => {
            console.log('Socket disconnected: ', sk.id);
            socketsConnected.forEach((conn : any) => {
                if (conn.skId == sk.id) {
                    socketsConnected.delete(conn);
                }
            });
        });

        sk.on("chat-messages", (data : any) => {
            console.log('New message from: ', sk.id);

            console.log(data);
            
            sk.broadcast.emit("send-message", data);
        })
    }

    io.on("connection", onConnected);
}