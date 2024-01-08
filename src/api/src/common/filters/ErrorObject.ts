export interface ErrorsObject {
  errors: Array<ErrorObject>;
}

export interface ErrorObject {
  status: number;
  source?: Source;
  title?: string;
  detail?: string;
  service?: string;
}

export interface Source {
  pointer: string;
  module?: string;
}
