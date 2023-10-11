const express = require('express') //require or import express
const {createPatient,deleteHealthPackage, editHealthPackage, addHealthPackage, viewRegisteredFamilyMembers,
    createPrescription,viewAllPrescriptions, addFamilyMember, selectDoctor,filterPrescriptions,
    viewDoctors, findDoctor, filterDoctor, filterAppointmentsByDate, filterAppointmentsByStatus, viewMyAppointments} = require('../Controllers/patientController'); //we're destructuring so we need curly braces

const router = express.Router() //create a router    

router.post('/addPatient',createPatient); 

//router.get('/selectDoctorByName' , selectDoctorByName);

router.delete('/deleteHealthPackage' , deleteHealthPackage);

router.post('/editHealthPackage' , editHealthPackage);

router.post('/addHealthPackage' , addHealthPackage);

//router.get('/ViewselectDoctorDetails' , ViewselectDoctorDetails );

router.post("/addPrescription",createPrescription);  

router.post("/viewPrescription", viewAllPrescriptions); 

router.post('/addFamilyMember/', addFamilyMember);

router.post('/viewDoctors', viewDoctors);

router.post('/findDoctor' , findDoctor);

router.post('/filterDoctor' , filterDoctor);

router.get('/viewRegisteredFamilyMembers' , viewRegisteredFamilyMembers);

router.post('/filterAppointmentsByDate', filterAppointmentsByDate);

router.post('/filterAppointmentsByStatus', filterAppointmentsByStatus);


router.post('/filterPrescription' , filterPrescriptions); 

router.get('/selectDoctor' , selectDoctor);

router.post('/viewMyAppointments' , viewMyAppointments);


module.exports = router //we need to export that router at the end so that server.js can access it


