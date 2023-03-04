'use strict';

const { v4: uuidv4 } = require("uuid");
const {FeatureAction, Feature } = require('../config/db');
import { logger } from '../libs/logger'



module.exports = {
    async up(queryInterface, Sequelize) {

        try {
        
                  const data= await Feature.findOne({where:{name:'TrackNTrace'}})
                  if(data.dataValues.name==='TrackNTrace')
                  {
                   
                      await queryInterface.bulkInsert('featureActions',
                          [
                              {
                                id: uuidv4(),
                                featureId: data.dataValues.id,
                                name:'Scan Multiple',
                                description: 'Scan Multiple',
                                isActive: 'Yes',
                                isPredefined: 0,
                                createdAt: new Date(),
                                updatedAt:new Date(),
                            }
                            ])
                          }
            } 
            catch (err)   
            {
            logger.error("Error in Add New FeatureAction Actions For TrackNTrace.",err)
            }
      },

    async down(queryInterface, Sequelize) {
      /**
       * Add commands to revert seed here.
       *
       * Example:
       * await queryInterface.bulkDelete('People', null, {});
       */
    }
}
