const fs=require('fs');
const path=require('path');
const {v4:uuid}=require('uuid');
 
const dirInputs=path.join(__dirname,"inputs");
if(!fs.existsSync(dirInputs)){
    fs.mkdirSync(dirInputs,{recursive:true});
}
const generateInputFile = async (input) => {
    const jobID=uuid();
   
    const Inputfilename=`${jobID}.txt`;
    const InputfilePath=path.join(dirInputs,Inputfilename);
    await fs.writeFileSync(InputfilePath,input);
    return InputfilePath;


};  



module.exports = {
    generateInputFile
}; 