module.exports.addOwnerInfo = function (context) {
    context.data.created_by = context.params.user._id;
    context.data.updated_by = context.params.user._id;
};