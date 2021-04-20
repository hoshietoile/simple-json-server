# simple-json-server
**SimpleJsonServer**

## [使い方]
### ソースの取得とサーバーの起動
- git cloneする

      git clone https://github.com/hoshietoile/simple-json-server.git

- 依存パッケージをインストールする

      cd simple-json-server
      npm i

- .env.exampleをコピーして.envファイルを作成する

      cp .env.sample .env

- サーバーを起動する

      npm run start

- localhost:3000でサーバーが起動するのでリクエストを投げて遊ぶ

### リソースの追加
- コマンドを打つと対話型のインターフェースが立ち上がります(例はbookingsリソースの追加)

> npm run rsrc:create

      $ npm run rsrc:create

      json-server@1.0.0 rsrc:create {__root_path}\json-server
      node src/repl/create.js

      リソース名:
      > bookings
      >> bookings
      ローカルのファイルをインポートしますか?: (y/n)
      > n
      >> n
      bookings.jsonファイルを作成します。よろしいですか？: (y/n)

      > y
      >> y

      bookings.jsonファイルを作成しました。

      index.jsに以下のルーティングを追加しました。


      // routers

      app.use("/api/bookings", router);
      
- 下記RESTfulなエンドポイントが追加されるので、リクエストを投げて遊ぶ

      GET /api/bookings
      POST /api/bookings
      GET /api/bookings/:id
      PUT /api/bookings/:id
      DELETE /api/bookings/:id
