declare module 'dotenv-flow' {
    interface DotenvFlowOptions {
      node_env?: string;
      default_node_env?: string;
      path?: string;
      encoding?: string;
    }
  
    interface DotenvFlow {
      config(options?: DotenvFlowOptions): void;
    }
  
    const dotenvFlow: DotenvFlow;
    export default dotenvFlow;
  }
  