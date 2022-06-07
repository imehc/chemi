package services

import (
	"chemi/pkg/setting"
	"database/sql"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
	"log"
	"time"
)

var db *gorm.DB
var sqlDB *sql.DB

func Setup() {
	var err error
	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		setting.DatabaseSetting.User,
		setting.DatabaseSetting.Password,
		setting.DatabaseSetting.Host,
		setting.DatabaseSetting.Name,
	)

	db, err = gorm.Open(
		mysql.New(
			mysql.Config{
				DSN:                       dsn,   // DSN data source name
				DefaultStringSize:         256,   // string 类型字段的默认长度
				DisableDatetimePrecision:  true,  // 禁用 datetime 精度，MySQL 5.6 之前的数据库不支持
				DontSupportRenameIndex:    true,  // 重命名索引时采用删除并新建的方式，MySQL 5.7 之前的数据库和 MariaDB 不支持重命名索引
				DontSupportRenameColumn:   true,  // 用 `change` 重命名列，MySQL 8 之前的数据库和 MariaDB 不支持重命名列
				SkipInitializeWithVersion: false, // 根据当前 MySQL 版本自动配置
			}),
		&gorm.Config{
			NamingStrategy: schema.NamingStrategy{ // 表和命名策略
				SingularTable: false, //使用单数表面,启用该选项后,表不加s
				//NameReplacer:  strings.NewReplacer("CID", "Cid"), // 在转为数据库名称之前，使用NameReplacer更改结构/字段名称。
				TablePrefix: setting.DatabaseSetting.TablePrefix, // 表名前缀,`User`表为`t_user`
			},
			Logger: logger.Default.LogMode(logger.Info), // 配置日志
			//SkipDefaultTransaction: true,                                // 跳过默认事务
			NowFunc: func() time.Time { // 更改创建时间使用的函数
				return time.Now().Local()
			},
			//DryRun: false, // 生成 SQL 但不执行，可以用于准备或测试生成的 SQL
			//PrepareStmt: true,// 在执行任何 SQL 时都会创建一个 prepared statement 并将其缓存，以提高后续的效率
			//DisableNestedTransaction: true,// 禁用嵌套事务
			//AllowGlobalUpdate: true,// 启用全局 update/delete
			//DisableAutomaticPing: true,// GORM 会自动 ping 数据库以检查数据库的可用性.可以禁用
			//DisableForeignKeyConstraintWhenMigrating: true, // 禁用物理外键 GORM 会自动创建外键约束，若要禁用该特性 建议禁用物理外键
		},
	)
	if err != nil {
		log.Fatalf("services.Setup err: %v", err)
		return
	}

	//注册进 GORM 的钩子里，但其本身自带 Create 和 Update 回调，因此调用替换即可
	//db.Callback().Create().Replace("gorm:update_time_stamp",updateTimeStampForCreateCallback)
	sqlDB, err = db.DB()
	if err != nil {
		log.Fatalf("sql setting err: %v", err)
	}
	// 设置空闲连接池中连接的最大数量
	sqlDB.SetMaxIdleConns(10)
	// 设置打开数据库连接的最大数量。
	sqlDB.SetMaxOpenConns(100)
	// 设置了连接可复用的最大时间。
	sqlDB.SetConnMaxLifetime(time.Hour)
}

// err := db.AutoMigrate(&User{}) 如果该表不存在,则创建

func CloseDB() {
	defer sqlDB.Close()
}
