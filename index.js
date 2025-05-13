const express = require( 'express' );
const app = express();
const http = require( 'http' );
const server = http.createServer( app );
const { Server } = require( "socket.io" );
const io = new Server( server );
const port = 3000;
//LRU = require('lru-cache');

app.set( 'view engine', 'ejs' );
//ejs.cache = LRU(100);
app.set( 'views', 'views' );
app.use( express.static( 'public' ) );

	const users = [
		{
			id: 1,
			name: "Alice",
			email: "alice@example.com",
			messages: [
				{
					text: "Hey Bob!",
					timestamp: "2025-05-01T10:00:00"
				},
				{
					text: "Are you there?",
					timestamp: "2025-05-01T10:15:00"
				}
			]
		},
		{
			id: 2,
			name: "Bob",
			email: "bob@example.com",
			messages: [
				{
					text: "Hi Alice!",
					timestamp: "2025-05-01T10:05:00"
				},
				{
					text: "Yes, I'm here.",
					timestamp: "2025-05-01T10:20:00"
				}
			]
		},
		{
			id: 3,
			name: "Charlie",
			email: "charlie@example.com",
			messages: [
				{
					text: "Hello everyone!",
					timestamp: "2025-05-01T09:50:00"
				},
				{
					text: "Looking forward to our meeting.",
					timestamp: "2025-05-01T10:30:00"
				}
			]
		}
	];

app.get( '/', ( req, res ) => {

	const currentUser = 1;
	
	
	//res.send( '<h1>Hello World!</h1>' );
	return res.render( "pages/home", { users } );
} );

io.on( 'connection', ( socket ) => {
	console.log( 'a user connected' );
	socket.on( 'disconnect', () => {
		console.log( 'user disconnected' );
	} );
} );

server.listen( port, () => { 
	console.log( `Server is running at http://localhost:${port}` );
} );
