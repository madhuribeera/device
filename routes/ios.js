//--------- Adding New Data ------------

// var moment = require('moment');
// var from = moment();
// var to = moment();
module.exports.add_save = function(req, res) {
    var input = JSON.parse(JSON.stringify(req.body));
    console.log(input);
    console.log('input1');
    req.getConnection(function(err, connection) {
        if (err) {
             console.log(err1);
            console.log('err1');


            res.status(500).json({status: "-4", message : "Unable to process your request. Please try again later."});
        }
        if(typeof input.status ==='undefined'){
            input.status = 1
        }
        if ( typeof input.name === 'undefined') 
        {
            res.status(401).json({"status" :"-2","Error": "Missing 'Name'"});
        }
        else if( typeof input.name !== 'string' || validator.isNumeric(input.name)){
            res.status(401).json({"status": "-2","Message":"Invalid value to Name"})
        }
        else if(validator.isEmpty(input.name)){
            res.status(401).json({"status": "-2","Message":"Name can not be Empty"})
        }
        else{
            var query = connection.query("SELECT name FROM ios WHERE name = ? ",input.name,function(err,data){
                if(err){
                    console.log(err2);
                    console.log('err2');

                    res.status(500).json({status: "-4", message : "Unable to process your request. Please try again later."});
                }
                else if (data.length > 0) {
                    res.status(401).json({"status":"-5","message":"This Device Already Taken"}); 
                }
                else {
                    currentdate = dateTime(new Date(), {
                            local: false

                        });
                    // console.log(to.format());
                    // console.log(to.format('MMM Do YYYY,h:mma'));
                    var data = {
                    id         : input.id,
                    model      : input.model,
                    color      : input.color,
                    devicetype : input.devicetype,
                    os         : input.os,
                    version    : input.version,
                    name       : input.name,
                    from       : currentdate,
                    to         : currentdate,
                    requesttime: currentdate,
                    status     : input.status,
                    createdon  : currentdate,
                    updatedon  : currentdate
                    
                    }
                    var query = connection.query("INSERT into ios set ?", data, function(err, rows) {
                        if (err) {
                            console.log(err);
                          console.log('err3');


                            res.status(500).json({status: "-4", message : "Unable to process your request. Please try again later."});
                        } else {
                            res.status(200).json({
                                status: "1",
                                message: "Data Added Successfully"
                            });
                        }
                    });
                }
            });
        }

    });
}