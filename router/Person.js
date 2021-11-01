const express =require("express");
const Person=require ("../models/Person")

const router=express.Router();
  router.get("/y", async (req, res) => {
    try {
      
      const findperson = await Person.find({});
      res.send({ msg: "get the contact", findperson });

    } catch (error) {
      res.status(400).send({ msg: "can not get the contact" });
    }
  });

router.delete('/D',  async (req, res) => {
  const {name} = req.body;
  try {
 let r=await Person.deleteMany({name});
 console.log(r)
 if(r.deletedCount){
  return res.send( {msg: "contact Deleted"});

 }else{
  return res.status(400).send( {msg: "there is no contact to Delete"});

 }
  //  if (!Del) return res.sendStatus(404);
  } catch (error) {
   return res.sendStatus(400);
  }
 });

router.get("/food", async (req, res) => {
    try {
      const { favoriteFoods } = req.body;
      console.log(favoriteFoods)
      const findperson = await Person.findOne( {favoriteFoods: { "$in" : [favoriteFoods]} } );
      res.send({ msg: "get the contact", findperson });
    // res.send("ok")
    } catch (error) {
      res.status(400).send({ msg: "can not get the contact" });
    }
  }); 


router.post("/P",async(req,res)=>{

try{
 const newPerson= new Person({...req.body});
await newPerson.save(),
console.log(newPerson);
   res.send({msg:"add route", newPerson});
} catch(error){
    res.status(400).send({msg:"user not saved", error})
}
});

router.get("/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      const findperson = await Person.findById({ _id });
      res.send({ msg: "get the contact", findperson });
    } catch (error) {
      res.status(400).send({ msg: "can not get the contact" });
    }
  });


  router.get("/name", async (req, res) => {
    try {
      const { name } = req.body;
      const findperson = await Person.findOne({ name });
      res.send({ msg: "get the contact", findperson });
    } catch (error) {
      res.status(400).send({ msg: "can not get the contact" });
    }
  });





router.put("/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      // console.log(req.body);
      // await person.findByIdAndUpdate(
      //   { _id },
      //   { $push: { favoriteFoods: req.body } }
      // );
      let findPerson = await Person.findById(_id);
      findPerson.favoriteFoods.push(req.body.favoriteFoods);
      await findPerson.save();
      // await person.updateOne(
      //   { _id },
      //   { $push: { favoriteFoods: req.body.favoriteFoods } }
      // );
      res.send("done");
      // model.patch(id, body);
    } catch (error) {
      res.status(400).send({ msg: "can not get the contact" });
    }
  });

  router.put("/v/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      // let findPerson = await Person.findById(_id);
     await Person.updateOne({_id},{$set:{age:req.body.age}});
      // await findPerson.save();
      res.send("done");
      
    } catch (error) {
      res.status(400).send({ msg: "can not get the contact" });
    }
  });
  router.delete('/d:_id',  async (req, res) => {
    const {_id} = req.params;
    try {
     const Del = await Person.findByIdAndDelete(_id);
     if (!Del) return res.sendStatus(404);
     return res.send( {msg: "contact Deleted"});
    } catch (error) {
     return res.sendStatus(400);
    }
   });

  


module.exports=router;