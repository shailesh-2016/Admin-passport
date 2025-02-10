const { createTransport } = require("nodemailer");
const transport = createTransport({
  service: "gmail",
  auth: {
    user: "snmodi2020@gmail.com",
    pass: "dxdp edoi daod gbdb",
  },
});
async function sendEmail(to, subject,html) {
  const options = {
    from: "snmodi2020@gmail.com",
    to: to,
    subject:'hello world',
    html:html

  };
  await transport.sendMail(options,(err,info)=>{
    if(err){
        console.log(err);
        
    }else{
        console.log("send email")
    }
  })
}
module.exports=sendEmail
