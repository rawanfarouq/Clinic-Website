const Administrator = require('../Models/administratorModel');
const Doctor = require('../Models/doctorModel');
const Patient = require('../Models/patientModel');
const NewDoctorRequest = require('../Models/newDoctorRequestModel');

const mongoose = require('mongoose');

    // Add another administrator with a set username and password
const addAdministrator= async (req, res) => {
      try {
        const { username, password } = req.body;
        const newAdministrator = new Administrator({ username, password });
        const savedAdministrator = await newAdministrator.save();
        res.status(201).json(savedAdministrator);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding administrator' });
      }
}
  
    // Remove a pharmacist or patient from the system
const removeUserFromSystem =  async (req, res) => {
      try {
        const {id} = req.params; // ID of the pharmacist or patient to remove
        // Check if the user is a pharmacist or patient and remove accordingly
        //const removedUser = await (Pharmacist.findOneAndRemove(userId) || Patient.findOneAndRemove(userId));
        const removedUserDoctor = await Doctor.findOneAndDelete({_id : id});
        const removedUserPatient = await Patient.findOneAndDelete({_id : id});  
        const removedAdmin = await Administrator.findOneAndDelete({_id : id});  

        
        if (removedUserDoctor==null && removedUserPatient==null && removedAdmin==null) {
          return res.status(404).json({ message: 'User not found' });
        }
        else{
        res.status(200).json({ message: 'User removed successfully' });
      }
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error removing user from the system' });
      }
}
  
    // View all information uploaded by a pharmacist to apply to join the platform
const viewDoctorApplication = async (req, res) => {
      try {
        // Fetch all pharmacist application data (customize this based on your data structure)
        const doctorApplications = await NewDoctorRequest.find({ status: 'pending' });
        res.status(200).json(doctorApplications);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching docotrs applications' });
      }
};



    // View a pharmacist's information
const viewPharmacistInformation = async (req, res) => {
      try {
        const pharmacist = await Pharmacist.find({});
        if (!pharmacist) {
          return res.status(404).json({ message: 'Pharmacists not found' });
        }
        res.status(200).json(pharmacist);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching pharmacist information' });
      }
}
  
    // View a patient's basic information
const viewPatientInformation = async (req, res) => {
      try {
        
        const patient = await Patient.find({});
        if (!patient) {
          return res.status(404).json({ message: 'Patients not found' });
        }
        
        res.status(200).json(patient);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching patient information' });
      }
}

  
const addHealthPackage = async (req,res)=>{
  try {
    const {patientUsername, packageName} = req.body;

    // Find the patient by name
    const patient = await Patient.findOne({ username: patientUsername });
  

    if(!packageName || (packageName.toLowerCase()!="gold" && packageName.toLowerCase()!="silver" && packageName.toLowerCase()!="platinum")){
      return res.status(404).json({ error: 'Package name not found or wrong package name.' });
    }

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found.' });
    }
    
    let price = 0;
    let discountOnSession = 0;
    let discountOnMedicine = 0;
    let discountOnSubscription = 0;
    
    const healthPackage ={
      name: packageName,
      price,
      discountOnSession,
      discountOnMedicine,
      discountOnSubscription
    }



    
    if(healthPackage.name.toLowerCase() == 'silver'){
      healthPackage.price=3600;
      healthPackage.discountOnMedicine=0.4;
      healthPackage.discountOnSession=0.2;
      healthPackage.discountOnSubscription=0.1;
    }
    if(healthPackage.name.toLowerCase() == 'gold'){//make this case insensitive
      healthPackage.price=6000;
      healthPackage.discountOnMedicine=0.6;
      healthPackage.discountOnSession=0.3;
      healthPackage.discountOnSubscription=0.15;
    }
    if(healthPackage.name.toLowerCase() == 'platinum'){//make this case insensitive
      healthPackage.price=9000;
      healthPackage.discountOnMedicine=0.8;
      healthPackage.discountOnSession=0.4;
      healthPackage.discountOnSubscription=0.2;
    }
    if (!patient.healthPackage){
    patient.healthPackage = healthPackage;
    await patient.save();}
    else {
    return res.status(404).json({ error: 'Patient already has health package.' });}

    /*
    const relatives = patient.familyMembers;
    if(relatives){
    for (const relative of relatives) {
      // Check if the relative is not empty (assuming each relative has name, nationalId, and gender properties)
      if (relative.id) {
        // Use Mongoose to search for a patient with matching credentials
        const foundPatient = await Patient.findOne({Iid : relative.id});
    
        if (foundPatient && foundPatient.healthPackage) {
          foundPatient.healthPackage.price = foundPatient.healthPackage.price -(foundPatient.healthPackage.price * patient.healthPackage.discountOnSubscription);
        }
        res.json(foundPatient);
      }
    }
  }*/


    res.json(patient);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not add health package' });
  }
  
}

const editHealthPackage = async (req,res)=>{
  try {
    const {patientUsername, packageName} = req.body;

    // Find the patient by name
    const patient = await Patient.findOne({ username: patientUsername });
  

    if(!packageName || (packageName.toLowerCase()!="gold" && packageName.toLowerCase()!="silver" && packageName.toLowerCase()!="platinum")){
      return res.status(404).json({ error: 'Package name not found or wrong package name.' });
    }

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found.' });
    }

    if(!patient.healthPackage){
      return res.status(404).json({ error: 'This patient does not have a health package.' });
    }
    
    let price = 0;
    let discountOnSession = 0;
    let discountOnMedicine = 0;
    let discountOnSubscription = 0;
    
    const healthPackage ={
      name: packageName,
      price,
      discountOnSession,
      discountOnMedicine,
      discountOnSubscription
    }



    
    if(healthPackage.name.toLowerCase() == 'silver'){//make this case insensitive
      healthPackage.price=3600;
      healthPackage.discountOnMedicine=0.4;
      healthPackage.discountOnSession=0.2;
      healthPackage.discountOnSubscription=0.1;
    }
    if(healthPackage.name.toLowerCase() == 'gold'){//make this case insensitive
      healthPackage.price=6000;
      healthPackage.discountOnMedicine=0.6;
      healthPackage.discountOnSession=0.3;
      healthPackage.discountOnSubscription=0.15;
    }
    if(healthPackage.name.toLowerCase() == 'platinum'){//make this case insensitive
      healthPackage.price=9000;
      healthPackage.discountOnMedicine=0.8;
      healthPackage.discountOnSession=0.4;
      healthPackage.discountOnSubscription=0.2;
    }

    patient.healthPackage = healthPackage;
    await patient.save();

    res.json(patient);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not edit health package' });
  }
  
}

const deleteHealthPackage = async (req,res)=>{
  try {
    const {patientUsername} = req.body;

    // Find the patient by name
    const patient = await Patient.findOne({ username: patientUsername });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found.' });
    }

    if(!patient.healthPackage){
      return res.status(404).json({ error: 'This patient does not have a health package.' });
    }
    

    patient.healthPackage = null;
    await patient.save();

    res.json(patient);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Could not delete health package' });
  }
  
}



    
module.exports = {  
  addAdministrator,
  removeUserFromSystem,
  viewDoctorApplication,
  viewPharmacistInformation,
  viewPatientInformation,
  addHealthPackage,
  editHealthPackage,
  deleteHealthPackage,
 
 }; 