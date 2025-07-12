declare module 'cleave.js' {
  interface CleaveOptions {
    creditCard?: boolean;
    date?: boolean;
    datePattern?: string[];
    onValueChanged?: (e: any) => void;
  }

  export default class Cleave {
    constructor(selector: string | HTMLElement, options: CleaveOptions);
  }
}
