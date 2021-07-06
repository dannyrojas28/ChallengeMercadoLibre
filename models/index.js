
/* Save data received for the api */
const InsertData = async (cmutant) => {
    const db = await loadDB();
    return new Promise(async(resolve, reject) => {
        await db.collection("stats").findOne({}, function(err, result) {
            if(result!=null){
                db.collection("stats").updateOne({},{$set : { 
                   count_human_dna: parseInt(result.count_human_dna) + 1, 
                    count_mutant_dna:  parseInt(result.count_mutant_dna) + cmutant
                }}, function(err, res) {
                    if (err)  reject( err);
                        resolve(true)
                    });
            }else{
                db.collection("stats").insertOne({ count_human_dna: 1, count_mutant_dna: cmutant}, function(err, res) {
                if (err)  reject( err);
                    resolve(true)
                });
            }
        });
    });
};

const getData = async () => {
    const db = await loadDB();
    return new Promise(async(resolve, reject) => {
        await db.collection("stats").findOne({}, function(err, result) {
            if (err)  reject( err);
            resolve(result)
        });
    });
};


module.exports = {
    InsertData: InsertData,
    getData:getData
}