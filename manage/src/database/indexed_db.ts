type StoresValue = {
  /**
   * 主键
   */
  keyPath: string;
  /**
   * 索引列表
   */
  indexs: string[]
}

class DB {
  /**
   * 数据库名称
   */
  private dbName: string;
  /**
   * 数据库对象
   */
  private db: IDBDatabase | null = null;

  constructor(dbName: string) {
    this.dbName = dbName
  }

  /**
   * 
   * @param stores 多个对象仓库
   * @returns 
   */
  public openStore(stores: Record<string, StoresValue>): Promise<unknown> {
    // 第二个参数表示数据库的版本号，默认是1，这里设置为2，所以会进行升级，执行onupgradeneeded回调
    const request = window.indexedDB.open(this.dbName, 2)
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        console.log("数据库打开成功...")
        // 把数据库绑定到db属性上
        this.db = (event.target as IDBOpenDBRequest).result
        resolve((event.target as IDBOpenDBRequest).result)
      }
      request.onerror = (event) => {
        console.log('数据库打开失败')
        reject(event)
      }
      request.onupgradeneeded = (event) => {
        console.log('数据库升级成功')
        // 创建表-存储对象
        const { result } = event.target as IDBOpenDBRequest
        for (const storeName in stores) {
          // 初始化多个ojectStore对象仓库，获取数据表的主键和索引
          const { keyPath, indexs } = stores[storeName]
          // 没有表则创建
          if (!result.objectStoreNames.contains(storeName)) {
            // keyPath：主键，主键（key）是默认建立索引的属性；
            // autoIncrement：是否自增；
            // createObjectStore会返回一个对象仓库objectStore(即新建一个表)
            const store = result.createObjectStore(storeName, {
              autoIncrement: true,
              keyPath,
            })
            // 创建数据表索引
            if (!!indexs.length) {
              indexs.map((v) =>
                // createIndex可以新建索引，unique字段是否唯一
                store.createIndex(v, v, { unique: true })
              )
            }
            store.transaction.oncomplete = (e) => {
              console.log("创建对象仓库成功")
            }
          }
        }
      }
    })
  }

  /**
   * 往数据库添加数据： 新增/修改
   * @param storeName 数据库名称
   * @param data 添加的数据
   * @returns 
   */
  public updateItem(storeName: string, data: Record<string | number | symbol, any>): Promise<unknown> {
    const store = this.checkStoreIsExist(storeName, "readwrite")
    const request = store.put({ ...data, updateTime: +new Date() })
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        console.log('数据写入成功')
        resolve(event)
      }
      request.onerror = (event) => {
        console.log('数据写入失败')
        reject(event)
      }
    })
  }

  /**
   * 删除
   * @param storeName 数据库名称
   * @param key 索引
   */
  public deleteItem(storeName: string, key: string | number): Promise<unknown> {
    const store = this.checkStoreIsExist(storeName, "readwrite")
    const request = store.delete(key)
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        console.log('数据删除成功')
        resolve(event)
      }
      request.onerror = (event) => {
        console.log('数据删除失败')
        reject(event)
      }
    })
  }

  /**
   * 查询所有数据
   * @param storeName 数据库名称
   * @returns 
   */
  public getAllItem(storeName: string): Promise<unknown> {
    const store = this.checkStoreIsExist(storeName)
    const request = store.getAll()
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        console.log('查询所有数据成功')
        resolve((event.target as IDBOpenDBRequest).result)
      }
      request.onerror = (event) => {
        console.log('查询所有数据失败')
        reject(event)
      }
    })
  }

  /**
   * 查询单个数据
   * @param storeName 数据库名称
   * @returns 
   */
  public getItem(storeName: string, key: string | number): Promise<unknown> {
    const store = this.checkStoreIsExist(storeName)
    const request = store.get(key)
    return new Promise((resolve, reject) => {
      request.onsuccess = (event) => {
        console.log('查询单个数据成功')
        resolve((event.target as IDBOpenDBRequest).result)
      }
      request.onerror = (event) => {
        console.log('查询单个数据失败')
        reject(event)
      }
    })
  }

  /**
   * 检查是否存在
   * @param storeName 数据库名称
   * @returns IDBObjectStore
   */
  private checkStoreIsExist(storeName: string, mode?: IDBTransactionMode): IDBObjectStore {
    // 添加数据通过事务来添加，事务是在数据库对象上
    // 第二个参数表示读写模式
    const store = this.db?.transaction([storeName], mode).objectStore(storeName)
    // put可以新增和修改  add 只是新增
    if (!store) {
      throw ("请确认数据库是否存在")
    }
    return store
  }
}

export default DB