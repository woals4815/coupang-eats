import "dotenv/config";
import crypto from "crypto";
import axios from "axios";

const url = `https://sens.apigw.ntruss.com/sms/v2/services/${process.env.NCP_ID}/messages`;

export const makeSignature = () => {
  const message = [];
  const secretKey = process.env.NCP_SECRET_2;
  const accessKey = process.env.NCP_ACCESS;
  const hmac = crypto.createHmac("sha256", secretKey);
  const space = " ";
  const newLine = "\n";
  const method = "POST";
  const timestamp = Date.now().toString();
  const serviceId = process.env.NCP_ID;
  const url2 = `/sms/v2/services/${serviceId}/messages`;
  message.push(method);
  message.push(space);
  message.push(url2);
  message.push(newLine);
  message.push(timestamp);
  message.push(newLine);
  message.push(accessKey);
  //message 배열에 위의 내용들을 담아준 후에
  //message.join('') 으로 만들어진 string 을 hmac 에 담고, base64로 인코딩한다
  const signature = hmac.update(message.join("")).digest("base64");
  return signature.toString();
};

export const sendSMS = async (phoneNumber) => {
  try {
    const verifyCode = Math.floor(100000 + Math.random() * 900000);
    const body = {
      type: "SMS",
      countryCode: "82",
      from: "01041816301", // 발신자 번호
      content: `아들의 테스트 인증 번호[${verifyCode}] `,
      messages: [
        {
          to: phoneNumber, // 수신자 번호
        },
      ],
    };
    const signature = makeSignature();
    const options = {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-ncp-iam-access-key": process.env.NCP_ACCESS,
        "x-ncp-apigw-timestamp": Date.now().toString(),
        "x-ncp-apigw-signature-v2": signature,
      },
    };
    const result = await axios.post(url, body, options);
    console.log(result);
  } catch (error) {
    console.log(error.response.data.error);
    return error;
  }
};
