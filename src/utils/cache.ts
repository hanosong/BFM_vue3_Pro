enum CacheType {
  Local,
  Session
}

class Cache {
  storage: Storage

  constructor(type: CacheType){
    this.storage = type === CacheType.Local
      ? localStorage
      : sessionStorage
  }

  setCache(key: string, value: any){
    if(value){
      this.storage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string){
    const val = this.storage.getItem(key);
    if(val){
      return JSON.parse(val)
    }
  }

  removeCache(key: string){
    this.storage.removeItem(key)
  }

  clear(){
    this.storage.clear()
  }
}

const localCache = new Cache(CacheType.Local)
const sessionCache = new Cache(CacheType.Session)

export {
  localCache,
  sessionCache,
}
