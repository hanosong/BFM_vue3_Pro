class Cache {
  setCache(key: string, value: any){
    if(value){
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  getCache(key: string){
    const val = localStorage.getItem(key);
    if(val){
      return JSON.parse(val)
    }
  }

  removeCache(key: string){
    localStorage.removeItem(key)
  }

  clear(){
    localStorage.clear()
  }
}

export default new Cache()
