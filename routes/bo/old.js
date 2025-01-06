const express = require('express');
const router = express.Router();
// const LabelBO = require('../../controllers/bo/label');
// const languageController = require('../../controllers/bo/language');
// const LanguageBO = require('../../controllers/bo/language');
// const RoleController = require('../../controllers/bo/role');
const { verify } = require('../auth');

// const appUser = require('../../controllers/bo/appUser');
// const MosqueController = require('../../controllers/bo/mosque');
// const CategoryController = require('../../controllers/bo/category');
// const AdspaceController = require('../../controllers/bo/adspace');
// const FaqcategoryController = require('../../controllers/bo/faqcategory');
// const TemplatecategoryController = require('../../controllers/bo/templatecategory');
// const FaqController = require('../../controllers/bo/faq');
// const PreachController = require('../../controllers/bo/preach');
// const NewsController = require('../../controllers/bo/news');
// const NotificationController = require('../../controllers/bo/notification');
// const TemplateController = require('../../controllers/bo/template');
// const DonationController = require('../../controllers/bo/donation');
// const SubscriptionController = require('../../controllers/bo/subscription');
// const RolepermissionController = require('../../controllers/bo/rolepermission');
// const SupportController = require('../../controllers/bo/support');
// const DashboardController = require('../../controllers/bo/dashboard');

// const Helper = require('../../utils/helper');
// const mutler = require('multer');
// const { templatecategoryCreate } = require('../../controllers/bo/templatecategory');
// const uploads = mutler({ storage: Helper.storage }); /*upload array of image*/
// const audioUpload = mutler({ storage: Helper.audiostorage });
// const pdfUpload = mutler({ storage: Helper.pdfstorage });

// const AdminController = require('../../controllers/bo/admin');

// router.post('/login', AdminController.login);

//Label & Language
// router.post('/label', verify, LabelBO.create);
// router.put('/labelupdate', verify, LabelBO.update);
// router.get('/codeList', verify, LabelBO.codeList);
// router.post('/codeList', verify, LabelBO.codeList);
// router.post('/getCodeByKey', verify, LabelBO.getCodeByKey);
// router.post('/labeldelete', verify, LabelBO.labelDeleteRecord);
// //AppUsers
// router.get('/userList', verify, appUser.userList);
// router.post('/updateAppUser', verify, appUser.updateAppUser);
// router.post('/deleteUser', verify, appUser.deleteUser);

// //language
// router.post('/insertLanguage', verify, languageController.insertLanguage);
// router.post('/getLanguageById', verify, languageController.getLanguageById);
// router.get('/getLanguageList', verify, languageController.getLanguageList);
// router.post('/updateLanguageById', verify, languageController.updateLanguageById);
// router.post('/deleteLanguageById', verify, languageController.deleteLanguageById);

// //Login & Forget password
// router.post('/addAdminUser', verify, uploads.array('images'), AdminController.addAdminUser);
// router.post('/updatePassword', AdminController.updatePassword);

// router.post('/verifyCode', AdminController.verifyCode);
// router.get('/getBOuserList', verify, AdminController.getBOuserList);
// router.post('/getBOuserList', verify, AdminController.getBOuserListInPost);
// router.post('/getBOuserListByMosque', verify, AdminController.getBOuserListByMosque);
// router.post('/forgetPasswordReq', AdminController.forgetPasswordReq);
// router.post('/createSuperAdmin', AdminController.createSuperAdmin);
// router.post('/updateBOuser', verify, uploads.array('images'), AdminController.updateBOuser);
// router.post('/deleteAdminUser', verify, AdminController.deleteAdminUser);
// router.get('/getImamType', verify, AdminController.imamTypeList);
// router.get('/bouserView', verify, AdminController.bouserView);
// router.post('/updateBOprofile', verify, uploads.array('images'), AdminController.updateBOprofile);
// router.post('/otpvalidation',verify, AdminController.otpValidation);
// router.post('/resendotp',verify, AdminController.resendOtp);
// router.get('/linkmosque', verify, AdminController.getLinkMosque);
// router.get('/userlinkmosque', verify, AdminController.getUserLinkMosque);

// //Mosque 
// router.post('/mosquecreate', verify, uploads.array('images'), MosqueController.create);
// router.get('/mosquesignedurl', verify, MosqueController.generatePresignedUrl);
// router.put('/mosqueupdate', verify, uploads.array('images'), MosqueController.mosqueUpdate);
// router.delete('/mosquedelete', verify, MosqueController.mosqueDelete);
// router.get('/mosquelist', verify, MosqueController.mosqueList);
// router.get('/mosqueview', verify, MosqueController.mosqueView);
// router.post('/mosquedelete', verify, MosqueController.mosqueDeleteRecord);
// router.get('/mosquelistdashboard', verify, MosqueController.mosqueListForDashboard);

// //RolesCRUD
// router.post('/insertRole', verify, RoleController.insertRole);
// router.post('/getRoleById', verify, RoleController.getRoleById);
// router.get('/getRoleList', verify, RoleController.getRoleList);
// router.post('/updateRoleById', verify, RoleController.updateRoleById);
// router.post('/deleteRoleById', verify, RoleController.deleteRoleById);

// //Category
// router.get('/categorylist', verify, CategoryController.categoryList);
// router.post('/categorycreate', verify, uploads.array('images'), CategoryController.categoryCreate);
// router.get('/categoryview', verify, CategoryController.categoryView);
// router.put('/categoryupdate', verify, uploads.array('images'), CategoryController.categoryUpdate);
// router.delete('/categorydelete', verify, CategoryController.categoryDelete);
// router.post('/categorydelete', verify, CategoryController.categoryDeleteRecord);

// //Adspace
// router.get('/adspacelist',verify, AdspaceController.adspaceList);
// router.post('/adspacecreate',verify,uploads.array('images'), AdspaceController.adspaceCreate);
// router.get('/adspaceview',verify, AdspaceController.adspaceView);
// router.put('/adspaceupdate',verify,uploads.array('images'),  AdspaceController.adspaceUpdate);
// router.delete('/adspacedelete',verify,  AdspaceController.adspaceDelete);
// router.post('/adStatusUpdate',verify,  AdspaceController.adStatusUpdate);
// router.post('/adspaceDeleteRecord',verify,  AdspaceController.adspaceDeleteRecord);

// //Faq Category
// router.get('/faqcategorylist', verify, FaqcategoryController.faqcategoryList);
// router.post('/faqcategorycreate', verify, FaqcategoryController.faqcategoryCreate);
// router.get('/faqcategoryview', verify, FaqcategoryController.faqcategoryView);
// router.put('/faqcategoryupdate', verify, FaqcategoryController.faqcategoryUpdate);
// router.delete('/faqcategorydelete', verify, FaqcategoryController.faqcategoryDelete);
// router.post('/faqcategorydelete', verify, FaqcategoryController.faqcategoryDeleteRecord);

// // Faq Q&A
// router.get('/faqlist', verify, FaqController.faqList);
// router.post('/faqcreate', verify, FaqController.faqCreate);
// router.get('/faqview', verify, FaqController.faqView);
// router.put('/faqupdate', verify, FaqController.faqUpdate);
// router.delete('/faqdelete', verify, FaqController.faqDelete);
// router.post('/faqdelete', verify, FaqController.faqDeleteRecord);

// // Preach
// router.get('/preachlist', verify, PreachController.preachList);
// router.get('/preachsignedurl', verify, PreachController.generatePresignedUrl);
// router.post('/preachcreate', verify, uploads.fields([{ name: 'audio', maxCount: 1 }, { name: 'images' }, { name: 'pdf', maxCount: 1 }, { name: 'video', maxCount: 1 }]), PreachController.preachCreate);
// router.get('/preachview', verify, PreachController.preachView);
// router.delete('/preachdelete', verify, PreachController.preachDelete);
// router.put('/preachupdate', verify, uploads.fields([{ name: 'audio', maxCount: 1 }, { name: 'images' }, { name: 'pdf', maxCount: 1 }, { name: 'video', maxCount: 1 }]), PreachController.preachUpdate);
// router.post('/preachdelete', verify, PreachController.preachDeleteRecord);

// //News
// router.get('/newslist', verify, NewsController.newsList);
// router.post('/newscreate', verify, uploads.fields([{ name: 'audio', maxCount: 1 }, { name: 'images' }, { name: 'pdf', maxCount: 1 }]), NewsController.newsCreate);
// router.get('/newsview', verify, NewsController.newsView);
// router.put('/newsupdate', verify, uploads.fields([{ name: 'audio', maxCount: 1 }, { name: 'images' }, { name: 'pdf', maxCount: 1 }]), NewsController.newsUpdate);
// router.post('/newsdelete', verify, NewsController.newsdelete);

// //Notifications
// router.get('/notificationlist', verify, NotificationController.notificationList);
// router.get('/templatelist', verify, TemplateController.templateList);
// router.post('/notificationcreate', verify, NotificationController.notificationCreate);
// router.post('/templatecreate', verify, TemplateController.templateCreate);
// router.get('/mosquelistbyadmin', verify, NotificationController.mosqueList);
// router.get('/notificationcount', verify, NotificationController.notificationCount);
// // router.put('/newsupdate', verify, uploads.fields([{ name: 'audio', maxCount: 1 }, { name: 'images' }, { name: 'pdf', maxCount: 1 }]), NewsController.newsUpdate);
// // router.post('/newsdelete', verify, NewsController.newsdelete);

// // Notification template categories
// router.post('/templatecategorycreate', verify, TemplatecategoryController.templatecategoryCreate);
// router.get('/templatecategorylist', verify, TemplatecategoryController.templatecategoryList);

// //Donation
// router.get('/donationlist', verify, DonationController.donationListGet);

// //subscription
// router.get('/subscriptionlist', verify, SubscriptionController.subscriptionListGet);

// //role permission
// router.get('/rolepermissionlist', verify, RolepermissionController.getRolePermissionList);
// router.get('/rolemenulist', verify, RolepermissionController.getRoleMenuList);
// router.post('/rolepermissioncreate', verify, RolepermissionController.rolePermissionCreate);
// router.put('/rolepermissionupdate', verify, RolepermissionController.rolePermissionUpdate);

// //support
// router.get('/supportlist',verify, SupportController.getSupportList);
// router.get('/supportdetail',verify, SupportController.getSupportDetail);
// router.post('/replyreport',verify, SupportController.addReplyMessage);

// //Dashboard
// router.get('/dashboard',verify, DashboardController.getDashboardDetails);
// router.get('/supportstatus',verify, SupportController.supportStatus);
// router.get('/supporttypelist',verify, SupportController.getTypeList);
// router.post('/settings',verify, DashboardController.dashboardSettings);
// router.get('/settings',verify, DashboardController.getDashboardSettings);

const syncdb = async (request, response) => {

    const { Role  } = require('../../models/role');
    const { User } = require('../../models/user');
    const { Status }  = require('../../models/status');
    const sequelize = require('../../config/db');
   
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    //  const {deviceManager} = require('../../models/devicemanager');
    //  const result = await deviceManager.findAll({});
    return response.status(200).send('sync done manureva');
}

router.get('/dbsync', syncdb);

module.exports = router;