const Organization = require('../models/organization');
const User = require('../models/user');

// Create organization
exports.createOrganization = async (req, res) => {
    const { name, description } = req.body;
    try {
        const organization = new Organization({ name, description });
        await organization.save();
        res.status(201).json({ organization_id: organization._id });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read organization by ID
exports.readOrganization = async (req, res) => {
    const { organization_id } = req.params;
    try {
        const organization = await Organization.findById(organization_id).populate('organization_members.user_id');
        if (!organization) return res.status(404).json({ message: 'Organization not found' });
        res.json(organization);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Read all organizations
exports.readAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.find().populate('organization_members.user_id');
        res.json(organizations);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update organization
exports.updateOrganization = async (req, res) => {
    const { organization_id } = req.params;
    const { name, description } = req.body;
    try {
        const organization = await Organization.findByIdAndUpdate(
            organization_id,
            { name, description },
            { new: true }
        );
        res.json(organization);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete organization
exports.deleteOrganization = async (req, res) => {
    const { organization_id } = req.params;
    try {
        await Organization.findByIdAndDelete(organization_id);
        res.json({ message: 'Organization deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//invite to organization
exports.inviteUserToOrganization = async (req, res) => {
    const { organization_id } = req.params;
    const { user_email } = req.body;
    console.log("User search result:", user_email);


    try {
        // Find the organization by ID
        const organization = await Organization.findById(organization_id);
        if (!organization) {
            return res.status(404).json({ message: 'Organization not found' });
        }

        // Find the user by email
        const user = await User.findOne({ email: user_email });
        if (!user) {
            return res.status(404).json({ message: 'user not found!' });
        }

        // Initialize members array if it doesn't exist
        organization.members = organization.members || [];

        // Check if the user is already a member
        if (organization.members.includes(user._id)) {
            return res.status(400).json({ message: 'User is already a member of this organization' });
        }

        // Add user to organization members and save
        organization.members.push(user._id);
        await organization.save();

        // Optionally, trigger additional actions here (e.g., send an invitation email)

        res.status(200).json({ message: `User invited successfully to organization ${organization.name}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while inviting the user' });
    }
};