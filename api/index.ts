//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import { Mongoosedb } from "./src/db";
import app from "./src/app"
import config from "./src/lib/config"

Mongoosedb
    .then((connect) => {
        connect.connection.db.collections()
        .then((res) => {
            for (let collection of res) {
                collection.deleteMany({})
            }
        })
        console.log(`Conectado a la base de datos ${connect.connection.db.databaseName}! :D`)
        app.listen(config.port, function () {
            console.log("App is listening on port 3001!")
        });
    })
    .catch(err => console.log(err))
