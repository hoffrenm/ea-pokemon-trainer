export class StorageUtils {
  public static storageSave<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public static storageRead<T>(key: string): T | undefined {
    const value = sessionStorage.getItem(key);

    try {
      if (value) return JSON.parse(value) as T;
      return undefined;
    } catch (error) {
      sessionStorage.removeItem(key);
      return undefined;
    }
  }

  public static storageClearKey(key: string): void {
    sessionStorage.removeItem(key);
  }
}
