const mongoose = require('mongoose');

const organizationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    organization_members: [
        {
            user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            access_level: { type: String, default: 'read' },
        },
    ],
});

module.exports = mongoose.model('Organization', organizationSchema);
