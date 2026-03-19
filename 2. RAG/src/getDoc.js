import { URL, fileURLToPath } from 'node:url';
import path from 'node:path';
import { PDFParse } from 'pdf-parse';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const file = path.join(__dirname, './assets/香蕉手机参数配置.pdf');
let promise;
export default async function getDoc() {
  if (promise) {
    return promise;
  }
  const parser = new PDFParse({ url: file });
  const data = await parser.getText();
  return data.text;
}

getDoc().then(r => {
  console.log(r);
})