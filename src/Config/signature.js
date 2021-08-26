import crypto from "crypto";

export const makeSignature = () => {
  const message = [];
  const hmac = crypto.createHmac("sha256", this.config.get("NCP_secretKey"));
  const space = " ";
  const newLine = "\n";
  const method = "POST";
  const timestamp = Date.now().toString();
  const uri = process.env.NCP_ID;
  const secretKey = process.env.NCP_SECRET;
  message.push(method);
  message.push(space);
  message.push();
  message.push(newLine);
  message.push(timestamp);
  message.push(newLine);
  message.push(this.config.get("NCP_accessKey"));
  //message 배열에 위의 내용들을 담아준 후에
  const signature = hmac.update(message.join("")).digest("base64");
  //message.join('') 으로 만들어진 string 을 hmac 에 담고, base64로 인코딩한다
  return signature.toString(); // toString()이 없었어서 에러가 자꾸 났었는데, 반드시 고쳐야함.
};
