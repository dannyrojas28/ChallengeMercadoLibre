var express = require('express');
const Stats = require('../models');
var router = express.Router();
const validator = require('../validationhandler');

/**
 * SERVICE TO VALIDATE IF YOU ARE MUTANT
 */
router.get('/', async (req, res) => {
    try {
        const rest = await Stats.getData();
        var human_dna = 0;
        var mutant_dna = 0;
        var ratio = 0;
        if(rest!=null){
            human_dna = rest.count_human_dna;
            mutant_dna = rest.count_mutant_dna;
            ratio = mutant_dna / human_dna;
        }
        res.status(200);
        res.json({count_human_dna:human_dna,count_mutant_dna:mutant_dna,ratio:ratio.toFixed(2)});
    } catch (error) {
        validator.rendererror(error,res,req);
    }
});

/**
 * SERVICE FOR RESTART VALUES OF MUTANTS
 */
router.get('/reset', async (req, res) => {
    try {
        await Stats.resetData();
        res.status(200);
        res.json({response:"Data reset"});
    } catch (error) {
        validator.rendererror(error,res,req);
    }
});

module.exports = router;
