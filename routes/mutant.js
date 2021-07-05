var express = require('express');
var router = express.Router();
const validator = require('../validationhandler');

/**
 * SERVICE TO VALIDATE IF YOU ARE MUTANT
 */
router.post('/', function(req, res, next) {
    try {
        const dna = req.body.dna;
        //validate letters and numbers of string of the array
        ValidateString(dna);
        var resp = isMutant(dna)
        res.status(resp.code);
        res.json({"code":resp.code,"response":resp.response});
    } catch (error) {
        validator.rendererror(error,res,req);
    }
});

function ValidateString(dna){
    var isLetter = true; 
    var numberStrings = 0;
    if(Array.isArray(dna) && dna.length>0){
        dna.map((element,pos) => {
            var el = Array.from(element);
            var find = el.every(elc =>
                elc=='A'||elc=='T'||elc=='C'||elc=='G' ? true : false
            );
            if(find==false){
                isLetter=false;
                throw {
                        code:403,
                        message:"String letters can only be: (A, T, C, G)",
                        stack:"Unknown letter find in position:"+pos
                }
            }
            
            if(numberStrings==0){
                numberStrings = el.length;
            }else{
                if(numberStrings!=el.length){
                    throw {
                            code:403,
                            message:"Array rows must be equal",
                            stack:"Array not match, "+el+" in position:"+pos
                    }
                }
            }
        });
    }else{
        throw {
            code:403,
            message:"The received variable is not an array",
            stack:dna
        }
    }
    return true;
}

function isMutant(dna){
    let code = 403;
    let response = false;
    var num_rows = dna.length;
    for(var j = 0; j < num_rows;j++){
        var element = dna[j];
        
        //variables to validate horizontal
        let val_hor = 0;
        var follow_hor = 0;

        var num_strings =  element.length;
        for(var x = 0; x <num_strings;x++){
            //we validate if there is more than one four-letter sequence equal horizontally
            if(follow_hor==0){
                val_hor=element[x];
                follow_hor=1;
            }else{
                if(val_hor==element[x]){
                    follow_hor+=1;
                }else{
                    val_hor=element[x];
                    follow_hor=1;
                }

            }

            if(follow_hor>=4){
                response = true;
                code = 200;
                break;
            }
            
            //variables to validate vertical
            let val_ver = 0;
            var follow_ver = 0;

            //variables to validate oblique
            let val_obq_rg = 0;
            var follow_obq_rg = 0;

            let val_obq_lf = 0;
            var follow_obq_lf = 0;
            var xy = x;
            var yx = x;
            //we validate if there is more than one four-letter sequence equal vertically and oblique
            for(var y =0; y <num_rows;y++){
                if(follow_ver==0){
                    val_ver=dna[y][x];
                    follow_ver=1;
                }else{
                    if(val_ver==dna[y][x]){
                        follow_ver+=1;
                    }else{
                        val_ver=dna[y][x];
                        follow_ver=1;
                    }
                }
                

                if(follow_ver>=4){
                    response = true;
                    code = 200;
                    break;
                }


                if(follow_obq_rg==0){
                    val_obq_rg=dna[y][x];
                    follow_obq_rg=1;
                }else{
                    let it_obq_rg = dna[y][xy];
                    if(it_obq_rg != undefined){
                        if(val_obq_rg==it_obq_rg){
                            follow_obq_rg+=1;
                        }else{
                            val_obq_rg=it_obq_rg;
                            follow_obq_rg=1;
                        }
                    }
                }
                xy+=1;

                if(follow_obq_rg>=4){
                    response = true;
                    code = 200;
                    break;
                }

                if(follow_obq_lf==0){
                    val_obq_lf=dna[y][x];
                    follow_obq_lf=1;
                }else{
                    let it_obq_lf = dna[y][yx];
                    if(it_obq_lf != undefined){
                        if(val_obq_lf==it_obq_lf){
                            follow_obq_lf+=1;
                        }else{
                            val_obq_lf=it_obq_lf;
                            follow_obq_lf=1;
                        }
                    }
                }
                

                if(follow_obq_lf>=4){
                    response = true;
                    code = 200;
                    break;
                }

                
                yx-=1;
            }
            if(code == 200){
                break;
            }
        }

        if(code == 200){
            break;
        }
       
    }
    return {code:code,response:response}
}
module.exports = router;
