const { program } = require('commander');
const ip = require('ip');
const os = require('os');
const detect = require('detect-port');

const groupBy = (array, key) => {

    let res = array.reduce((result = {}, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue)                
        return result
    }, {})
    for (let i = 0; i < Object.keys(res).length; i++) {
        res[Object.keys(res)[i]] = Object.values(res)[i][0]
    }
    return res

}

program.version('0.1.0')

console.log('\n')
console.log('\t======================================')
console.log('\t||          LINUX HELPER JS         ||')
console.log('\t||    Created by Angga Manggala     ||')
console.log('\t======================================')
console.log('\n')

program
    .command('network')
    .description('Display lists of local network data')
    .action(function(){
        let network = os.networkInterfaces()
        let response = []
        console.log('Network Interface Lists :\n')
        for (let i = 0; i < Object.keys(network).length; i++) {
            let newData = groupBy(Object.values(network)[i], 'family')
            response[Object.keys(network)[i]] = newData

            console.log(`=> ${Object.keys(network)[i]}`)

            for (let j = 0; j < Object.keys(newData).length; j++) {

                console.log(`\t=> ${Object.keys(newData)[j]}`)

                for (let k = 0; k < Object.values(newData[Object.keys(newData)[j]]).length; k++) {

                    let key = Object.keys(newData[Object.keys(newData)[j]])[k]
                    let val = Object.values(newData[Object.keys(newData)[j]])[k]
                    console.log(`\t\t ${ key } : ${ val }`)

                }

            }
            console.log('\n')

        }
        
    });

program
    .command('check-port')
    .description('Check free port on local')
    .action(function(port){
                
        let newPort = port['args'][0]
        detect(port = newPort, (err, _port) => {            
            if (err) {
                console.log(err);
            }
            
            if (port == _port) {
                console.log(`port: ${port} was not occupied`);
                console.log('\n')
            } else {
                console.log(`port: ${port} was occupied, try port: ${_port}`);
                console.log('\n')
            }
        });

    });
 
program.parse(process.argv);