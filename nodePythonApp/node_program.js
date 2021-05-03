const shell = require('shelljs')

const createProduct = async(req, res) => {
    console.log(`create prod in server ${req}`);
   
    
    try {
        shell.exec('python -m apps.simple_test')
        shell.exec('python -m apps.render_turntable -f ./results/pifuhd_final/recon -ww 512 -hh 512')
        
    } catch (error) {
      console.log(error)
        
    }
}

