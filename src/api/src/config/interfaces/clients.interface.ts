export interface Clients {
  [key: string]: Client;
}

export interface Client {
  id: string;
  secret: string;
  name: string;
  domain: string;
}
