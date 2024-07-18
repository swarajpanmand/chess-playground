
# Chess Game

A real-time multiplayer chess game built with Express, Socket.io, and Chess.js.
 Players can connect, play chess in real-time,
 and watch as spectators if both player slots are filled.



## Features

- Real-time multiplayer chess game.
- Players are assigned as white or black, and additional connections become spectators.
- Drag-and-drop interface for moving pieces.
- Chessboard automatically flips for black player.
- Responsive design using Tailwind CSS.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/swarajpanmand/chess-playground
   cd chess-playground
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

To start the server:

```bash
npm start
```

Open your browser and navigate to `http://localhost:3000`.

## Usage

- Open the app in two different browsers or incognito tabs to play against yourself.
- The first connection will be assigned the white pieces, the second the black pieces.
- Additional connections will join as spectators.

## Project Structure

```plaintext
├── public
│   └── javascripts
│       └── chessgame.js
├── views
│   └── index.ejs
├── app.js
├── package.json
├── tailwind.config.js
└── README.md
```


## Contributing

Contributions are welcome! Please open an issue or submit a pull request with your changes.

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add new feature'`.
4. Push to the branch: `git push origin my-feature-branch`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
