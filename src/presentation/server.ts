import express, { Router } from 'express';

interface Options {
  port: number;
  router: Router;
}

export class Server {

  private readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly router: Router;

  constructor( options: Options ) {
    const { port, router } = options;
    this.port = port;
    this.router = router;
  }

  async start() {
    this.app.use( express.json() );
    this.app.use( express.urlencoded( { extended: true } ) );

    this.app.use( this.router );
    this.serverListener = this.app.listen( this.port, () => console.log( `Server running on port ${ this.port }` ) );
  }

  public close() {
    this.serverListener?.close();
  }

}