declare module 'errorstacks' {
  export interface StackFrame {
    name: unknown;
    raw: string;
    fileName: string;
    line: number;
    column: number;
    type: string;
  }
  
  export function parseStackTrace(arg: unknown): StackFrame[]
}
