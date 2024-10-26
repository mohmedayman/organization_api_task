const express = require('express');
const {
    createOrganization,
    readOrganization,
    readAllOrganizations,
    updateOrganization,
    deleteOrganization,
    inviteUserToOrganization,
} = require('../controllers/organizationController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/organization', verifyToken, createOrganization);
router.get('/organization/:organization_id', verifyToken, readOrganization);
router.get('/organization', verifyToken, readAllOrganizations);
router.put('/organization/:organization_id', verifyToken, updateOrganization);
router.delete('/organization/:organization_id', verifyToken, deleteOrganization);
router.post('/organization/:organization_id/invite', verifyToken, inviteUserToOrganization);

module.exports = router;
