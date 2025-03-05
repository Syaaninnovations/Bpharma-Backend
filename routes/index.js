const express = require('express');
const router = express.Router();
const { verify } = require('./auth');
const UserController = require('../controllers/user');
const RoleController = require('../controllers/role');
const StatusController = require('../controllers/status');
const CountryController = require('../controllers/country');
const StateController = require('../controllers/state');
const DistributorController = require('../controllers/distributor');
const EmployeeController = require('../controllers/employee');
const ProductController = require('../controllers/product');
const ExpiryController = require('../controllers/expiry');
const SampleController = require('../controllers/sample');
const ClaimController = require('../controllers/claim');
const ClaimLogController = require('../controllers/claimlog');
const OfferController = require('../controllers/offer');
const ComplimentController = require('../controllers/compliment');
const ComplimentRequestController = require('../controllers/complimentRequest');

router.post('/login', UserController.login);

//Role module
router.post('/insert-role', verify, RoleController.insertRole);
router.put('/update-role/:id', verify,RoleController.updateRole);
router.get('/view-role/:id', verify,RoleController.getRole);
router.get('/list-roles', verify,RoleController.listRoles);
router.delete('/delete-role/:id', verify,RoleController.deleteRole);

//Status module
router.post('/insert-status', verify, StatusController.insertStatus);
router.put('/update-status/:id', verify,StatusController.updateStatus);
router.get('/view-status/:id', verify,StatusController.getStatus);
router.get('/list-status', verify,StatusController.listStatus);
router.delete('/delete-status/:id', verify,StatusController.deleteStatus);

//Country module
router.post('/insert-country', verify, CountryController.insertCountry);
router.put('/update-country/:id', verify,CountryController.updateCountry);
router.get('/view-country/:id', verify,CountryController.getCountry);
router.get('/list-country', verify,CountryController.listCountry);
router.delete('/delete-country/:id', verify,CountryController.deleteCountry);

//State module
router.post('/insert-state', verify, StateController.insertState);
router.put('/update-state/:id', verify,StateController.updateState);
router.get('/view-state/:id', verify,StateController.getState);
router.get('/list-state', verify,StateController.listState);
router.delete('/delete-state/:id', verify,StateController.deleteState);

// Distributor Module
router.post('/insert-distributor', verify, DistributorController.insertDistributor);
router.put('/update-distributor/:id', verify, DistributorController.updateDistributor);
router.get('/view-distributor/:id', verify, DistributorController.getDistributor);
router.delete('/delete-distributor/:id', verify,DistributorController.deleteDistributor);
router.get('/list-distributor', verify,DistributorController.listDistributor);

// Employee Module
router.post('/insert-employee', verify, EmployeeController.insertEmployee);
router.put('/update-employee/:id', verify, EmployeeController.updateEmployee);
router.get('/view-employee/:id', verify, EmployeeController.viewEmployee);
router.get('/list-employee', verify,EmployeeController.listEmployees);

// Product Module
router.post('/insert-product', verify, ProductController.insertProduct);
router.put('/update-product/:id', verify, ProductController.updateProduct);
router.get('/view-product/:id', verify, ProductController.viewProduct);
router.get('/list-product', verify,ProductController.listProducts);

// Expiry Module
router.post('/insert-expiry', verify, ExpiryController.insertExpiry);
router.put('/update-expiry/:id', verify, ExpiryController.updateExpiry);
router.get('/view-expiry/:id', verify, ExpiryController.viewExpiry);
router.get('/list-expiry', verify,ExpiryController.listExpiry);

// Sample Request Module
router.post('/insert-sample', verify, SampleController.insertSampleRequest);
router.put('/update-sample/:id', verify, SampleController.updateSampleRequest);
router.get('/view-sample/:id', verify, SampleController.viewSampleRequest);
router.get('/list-sample', verify,SampleController.listSampleRequest);

// Claim Module
router.post('/insert-claim', verify, ClaimController.insertClaim);
router.put('/update-claim/:id', verify, ClaimController.updateClaim);
router.get('/view-claim/:id', verify, ClaimController.viewClaim);
router.get('/list-claim', verify,ClaimController.listClaims);

// ClaimLog Module
router.post('/insert-claim-log', verify, ClaimLogController.insertClaimLog);
router.put('/update-claim-log/:id', verify, ClaimLogController.updateClaimLog);
router.get('/view-claim-log/:id', verify, ClaimLogController.viewClaimLog);
router.get('/list-claim-log', verify,ClaimLogController.listClaimLogs);

// Offer Module
router.post('/insert-offer', verify, OfferController.insertOffer);
router.put('/update-offer/:id', verify, OfferController.updateOffer);
router.get('/view-offer/:id', verify, OfferController.viewOffer);
router.get('/list-offer', verify,OfferController.listOffers);

// Compliment Module
router.post('/insert-compliment', verify, ComplimentController.insertCompliment);
router.put('/update-compliment/:id', verify, ComplimentController.updateCompliment);
router.get('/view-compliment/:id', verify, ComplimentController.getCompliment);
router.get('/list-compliment', verify,ComplimentController.listCompliment);

// ComplimentRequest Module
router.post('/insert-compliment-request', verify, ComplimentRequestController.insertComplimentRequest);
router.put('/update-compliment-request/:id', verify, ComplimentRequestController.updateComplimentRequest);
router.get('/view-compliment-request/:id', verify, ComplimentRequestController.getComplimentRequest);
router.get('/list-compliment-request', verify,ComplimentRequestController.listComplimentRequest);

const syncdb = async (request, response) => {

    //const { Offer }  = require('../models/offer');
    const { Compliments }  = require('../models/compliments');
    const { ComplimentsRequest }  = require('../models/complimentsRequest');
    const sequelize = require('../config/db');
   
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    //  const {deviceManager} = require('../../models/devicemanager');
    //  const result = await deviceManager.findAll({});
    return response.status(200).send('sync done manureva');
}

router.get('/dbsync', syncdb);

module.exports = router;