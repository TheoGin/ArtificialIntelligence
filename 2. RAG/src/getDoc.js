import { PDFParse } from "pdf-parse";

import path from "node:path";

import { fileURLToPath, URL } from "node:url";

// import.meta.url 获取当前文件的 URL
console.log("import.meta.url: ", import.meta.url); // import.meta.url:  file:///D:/DuYi/AI/code/ArtificialIntelligence/2.%20RAG/src/getDoc.js

console.log("new URL(\".\", import.meta.url): ", new URL(".", import.meta.url)); // new URL(".", import.meta.url):  URL { href: 'file:///D:/DuYi/AI/code/ArtificialIntelligence/2.%20RAG/src/', ..., pathname: '/D:/DuYi/AI/code/ArtificialIntelligence/2.%20RAG/src/', ..., }
const __dirname = fileURLToPath(new URL(".", import.meta.url));

console.log("__dirname: ", __dirname); // __dirname:  D:\DuYi\AI\code\ArtificialIntelligence\2. RAG\src\

const filePath = path.resolve(__dirname, "./assets/香蕉手机参数配置.pdf");
console.log("filePath: ", filePath); // filePath:  D:\DuYi\AI\code\ArtificialIntelligence\2. RAG\src\assets\香蕉手机参数配置.pdf

let fileContentPromise;

export default async function getDoc(filePath) {
  if (fileContentPromise) {
    return fileContentPromise;
  }

  const pdf = new PDFParse({
    url: filePath,
  });


  fileContentPromise = await pdf.getText();

  return fileContentPromise.text;
}

getDoc(filePath).then(r => {
  console.log(r);
})