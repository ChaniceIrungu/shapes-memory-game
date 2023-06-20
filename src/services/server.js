import { Client } from "colyseus.js";

export default class Server {
  // private client: Client
  constructor() {
    this.client = new Client("http://localhost:2567");
    console.log(this.client);
  }

  async join() {
    const room = this.client.joinOrCreate("shape-memory-game");
    console.log(room);
  }
}
