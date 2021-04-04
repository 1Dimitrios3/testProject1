const MView = require('../../../classes/membershipType2');
//const membershipForm = require('../../policies/membershipForm');


module.exports = {
    inputs:{
        hash:{type:'string'}
    },
    fn: async function({hash}) {
        let res = this.res
        let req = this.req
        let session = this.req.session
        let payload = [];
        let eligible
        //console.log('Params : ', req.params)
        let membershipList = await Membership.find({
        });

        if(hash == undefined){
            eligible = false
        } else if (hash == this.req.session.user.hash){
            eligible = true
        }

        //console.log('eligible loop before : ' , eligible)
        if(eligible){
            for(let membership in membershipList) {
                if(membershipList[membership].isOffer == true){
                    // Here we populate the price field on GET based on the name of the membership.
                    if(membershipList[membership].name == 'Bronze') {
                        membershipList[membership].price = 200
                    } else if (membershipList[membership].name == 'Silver') {
                        membershipList[membership].price = 300
                    }  else if (membershipList[membership].name == 'Special Offer') {
                        membershipList[membership].price = 280
                    }  else {
                        membershipList[membership].price = 600
                    }
                    
                    
                    // And then we prepare our class Object to serve to the view through the data attribute
                    console.log(membershipList[membership].isOffer)
                    let memDetails = new MView(
                        await membershipList[membership].id,
                        await membershipList[membership].name,
                        await membershipList[membership].typeCount,
                        await membershipList[membership].description,
                        await membershipList[membership].price,
                        await membershipList[membership].isOffer
                    ); 
                    // console.log(memDetails.price)

                    payload.push(memDetails)
                }
            }
            this.res.status(200)
            this.res.view('pages/membership/memberships', {data: payload, title:'Our specials'})
        
        } else if(!eligible){
            
            for(let membership in membershipList) {
                
                if(membershipList[membership].isOffer == false) {
                    
                    if(membershipList[membership].name == 'Bronze') {
                        membershipList[membership].price = 200
                    } else if (membershipList[membership].name == 'Silver') {
                        membershipList[membership].price = 300
                    }  else if (membershipList[membership].name == 'Special Offer') {
                        membershipList[membership].price = 280
                    }  else {
                        membershipList[membership].price = 600
                    }
                    
                    //console.log(membershipList[membership].isOffer)
                    let memDetails = new MView(
                        await membershipList[membership].id,
                        await membershipList[membership].name,
                        await membershipList[membership].typeCount,
                        await membershipList[membership].description,
                        await membershipList[membership].price,
                        await membershipList[membership].isOffer
                    ); 
                    // console.log(memDetails.price)
    
                    payload.push(memDetails)           
                }
            }
            this.res.status(200)
            this.res.view('pages/membership/memberships', {data: payload, title:'our memberships'})
        }
    }
}