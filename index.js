const SMTPServer = require("smtp-server").SMTPServer;
const PORT = 25;
const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,

    onConnect(session, cb){
        console.log("connection established to this session: ", session.id);
        cb(); // We are accepting the connection without checking authentication and authorisation
    },

    onMailFrom(address, session, cb){
        console.log(`Mail comes from this address ${address.address} and session is ${session.id}`);
        cb();
    },

    onRcptTo(address, session, cb){
        console.log(`onRcptTo address ${address.address} and session is ${session.id}`);
        cb();
    },

    onData(stream, session, cb){
        stream.on('data', (data)=>{
            console.log(`This is the body of the mail -> ${data.toString()}`)
        })

        stream.on('end', cb);
    }
});


server.listen(PORT, () => {
    console.log(`SMTP server is listening to port ${PORT}`);
})
