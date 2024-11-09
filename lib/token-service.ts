export class TokenService {
  private static instance: TokenService;
  private isRefreshing = false;
  private refreshQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (reason?: any) => void;
  }> = [];

  private constructor() {}

  static getInstance() {
    if (!this.instance) {
      this.instance = new TokenService();
    }
    return this.instance;
  }

  addToQueue() {
    return new Promise((resolve, reject) => {
      this.refreshQueue.push({ resolve, reject });
    });
  }

  executeQueue(error: any = null) {
    this.refreshQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve(null);
      }
    });
    this.refreshQueue = [];
  }

  getIsRefreshing() {
    return this.isRefreshing;
  }

  setIsRefreshing(value: boolean) {
    this.isRefreshing = value;
  }
}
