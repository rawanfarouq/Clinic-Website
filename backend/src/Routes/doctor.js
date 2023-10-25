const express = require('express') //require or import express
const {viewProfile, updateProfile, viewMyPatients , 
    viewAllPatients, searchPatientByName, filterByUpcomingDate, filterByStatus, 
    selectPatient, viewMyAppointments, searchPatientByUsername , filterByDateRange, viewAllDoctors , searchPatientPrescriptionsByName , viewWallet, filterByPastDate ,viewHealthRecords , viewContract ,acceptContract , addAvailableSlots , scheduleAppointment , addHealthRecord} = require('../Controllers/doctorController') //we're destructuring so we need curly braces

const router = express.Router() //create a router

router.post("/doctor-profile",viewProfile);
router.post("/doctor-update-profile",updateProfile);
router.post("/doctor-mypatients",viewMyPatients);
router.post("/doctor-patients", viewAllPatients);

router.get("/viewAllDoctors",viewAllDoctors);

router.post("/doctor-patients-name", searchPatientByName);
router.post("/doctor-patients-username", searchPatientByUsername); 
router.post("/doctor-patients/upcoming-date-filter", filterByUpcomingDate);
router.post("/doctor-patients/status-filter", filterByStatus);
router.post("/doctor-select-patients", selectPatient);
router.post("/doctor-myappointments", viewMyAppointments);
router.post("/doctor-patients/date-range-filter", filterByDateRange);

router.post("/doctor-patients/get-prescriptions", searchPatientPrescriptionsByName);

router.post("/view-wallet", viewWallet);
router.post("/past-appointments", filterByPastDate);
router.post("/get-health-records", viewHealthRecords);

// change to get ba3den
router.post("/viewContract",viewContract);
router.post("/acceptContract", acceptContract);
router.post("/addAvailableSlots", addAvailableSlots);
router.post("/scheduleAppointment", scheduleAppointment);
router.post("/addHealthRecord", addHealthRecord);

module.exports = router;
