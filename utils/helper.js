Helper = {};
Helper.checkLinkData = async (module_name, row_id) => {
    const { State } = require('../models/state');
    const Sequelize = require('sequelize');
    const Op = Sequelize.Op;
    let checkData = '';        
    if (module_name == "country") {
        let countryId = row_id;
        let state = await State.findOne({ where: { country_id: countryId } });
        if (state.length > 0) {
            return checkData = true;
        }
    }        
    return checkData
}