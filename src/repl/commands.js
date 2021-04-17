// https://note.kiriukun.com/entry/20200313-interactive-cli-example-with-nodejs
const readline = require("readline");
const fs = require("fs");
const promisify = require("util").promisify;
const AppError = require("./../assets/modules/appError");

// readlineのインターフェースを返す
const question = q => {
  const readLineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  return new Promise(resolve => {
    readLineInterface.question(q, a => {
      resolve(a);
      readLineInterface.close();
    });
  });
};

// 入力値を返す
const prompt = async () => {
  const answer = await question("> ");
  return answer.trim();
};

// シンプルなREPLのジェネレータ
async function* replGenerator () {
  while(true) {
    const answer = await prompt();
    yield(answer);
  }
}

// 配列で与えられた入力値のみ受け付けるREPLのジェネレータ
async function* replChoiceGenerator (choices) {
  while(true) {
    const answer = await prompt();
    if (choices.includes(answer)) {
      yield(answer);
    }
    // choice以外は次のループ
    console.log("");
  }
}

// 入力の絶対パスでファイル読み込みをするREPLのジェネレータ
async function* readFileGenerator () {
  while(true) {
    const filename = yield ""; // ファイル名を受け取る
    await promisify(fs.readFile)(
      filename,
      {encoding: "utf8"}
    )
      .catch(() => {
        console.log(filename);
        throw new AppError("No file found from provided route...", "404");
      });
    yield(null);
  }
}

// シンプルな対話式入力
const provideSimpleRepl = async (generator, msg) => {
  console.log(msg);
  const ans = await generator.next();
  console.log(">>", ans.value);
  return ans;
};

module.exports = {
  provideSimpleRepl,
  readFileGenerator,
  replChoiceGenerator,
  replGenerator
};