var fs = require('fs')



fs.readFile('batismos.json', 'utf8', function(error,data){
    if(error) throw error
    else{
        file = JSON.parse(data)
        for(let i=0; i<file.length; i++){
            file[i]["_id"] = file[i]["ref"].replace(/\//g, "_");  
            var str1 = file[i]["title"].split("Pai: ")[1].split("; Mãe:")[0]
            var str2 = file[i]["title"].split("Pai:")[1].split("; Mãe:")[1]
            //file[i]["pai"] = file[i]["title"].split("Pai:")[1].split("; Mãe: ")[0];
            file[i]["pai"] = file[i]["ref"].replace(/.*/,str1)
            file[i]["mae"] = file[i]["ref"].replace(/.*/,str2)
        }
        fs.writeFile('new_batismos.json',JSON.stringify(file),function(err) {
           if (err) throw err;
            console.log('complete');
            })
        }
    
})