// rsrc:createコマンドで立ち上がる実処理 即時関数
(async () => {
  require("dotenv").config();
  const fs = require("fs");
  const path = require("path");
  const promisify = require("util").promisify;
  const JSON_PATH = path.join("./..", process.env.JSON_PATH);
  const INDEX_PATH = "./../index.js";
  const {
    provideSimpleRepl,
    readFileGenerator,
    replChoiceGenerator,
    replGenerator
  } = require("./commands");
  
  // REPL用ジェネレータ
  const repl = replGenerator();
  const chrepl = replChoiceGenerator(["y", "n"]);
  const readFileRepl = readFileGenerator();
  let createFileFlg = false;

  // リソース名指定
  const filename = await provideSimpleRepl(repl, "リソース名:");

  // jsonファイルのインポート有無
  const importFlg = await provideSimpleRepl(chrepl, "ローカルのファイルをインポートしますか?: (y/n)");

  if (importFlg.value === "y") {
    // ローカルファイルのインポートをする場合
    const absPath = await provideSimpleRepl(repl, "インポートするローカルファイルの絶対パスを入力してください");

    // ファイルパスを指定してファイルの存在チェック
    await readFileRepl.next();
    await readFileRepl.next(absPath.value)
      .then(async () => {
        await promisify(fs.copyFile)(absPath.value, path.join(__dirname, `${JSON_PATH}${filename.value}.json`));
        createFileFlg = true;
      })
      .catch(err => {
        console.log(err.message);
      });
  } else if (importFlg.value === "n") {
    // ファイルの初期化のみの場合
    const confirm = await provideSimpleRepl(chrepl, `${filename.value}.jsonファイルを作成します。よろしいですか？: (y/n)`);

    // jsonファイルの作成
    if (confirm.value === "y") {
      await promisify(fs.writeFile)(path.join(__dirname, `${JSON_PATH}${filename.value}.json`), "[]", "utf8");
      createFileFlg = true;
    }
  }

  // ファイル作成の場合(最低限1つルーティング'app.use("/api/users", router);'がある前提)
  // 無ければ永遠に作らないので修正必要であれば
  if (createFileFlg) {
    // ルーティングの追加
    const appFile = await promisify(fs.readFile)(path.join(__dirname, INDEX_PATH), {encoding: "utf8"});
    const routesList = appFile.match(/app.use\(['|"]\/api\/.+\);/g); // 登録済みルーティングを配列で取得
    const lastRoute = routesList.pop(); // 一番最後のルーティング
    const newRoute = `app.use("/api/${filename.value}", router);`; // 新規ルーティング
    if (lastRoute) {
      const idx = appFile.indexOf(lastRoute); // 一番最後のルーティングのインデックス
      const len = lastRoute.length; // 一番最後のルーティングの文字列長
      const strPrepend = appFile.slice(0, idx + len);
      const strAppend = appFile.slice(idx + len);
      // console.log(index.slice(idx, idx + len))
      await promisify(fs.writeFile)(path.join(__dirname, INDEX_PATH), `${strPrepend}\n${newRoute}${strAppend}`);
      
      console.log(`
      ${filename.value}.jsonファイルを作成しました。\n
      index.jsに以下のルーティングを追加しました。\n

      // routers\n
      ${newRoute}\n
    `);
    } else {
      console.log("No route provided yet...");
    }
  } else {
    console.log("--[END]--");
  }
})();