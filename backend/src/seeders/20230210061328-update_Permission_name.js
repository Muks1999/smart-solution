'use strict';
const { Permission, RolePermission } = require('../config/db');
import { logger } from '../libs/logger'
import { Op } from "sequelize";


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {

      await Permission.update({ name: 'DigitizedTag' }, {
        where: {
          name: {
            [Op.or]: [
              { [Op.like]: `%digitize%` },
              { [Op.like]: `%deEnableTag%` },
              { [Op.like]: `%duplicate%` },
            ]
          }
        }
      });
      await Permission.update({ name: 'Export' }, {
        where: {
          name: {
            [Op.or]: [
              { [Op.like]: `%DiExportChunkNumber%` },
              { [Op.like]: `%TagsExportChunkNumber%` },
              { [Op.like]: `%productExportChunk%` },
            ]
          }
        }
      });
      await Permission.update({ name: 'Product' }, {
        where: {
          name:  {  [Op.like]: `%ProductMeta%` },
        }
      });
      await Permission.update({ name: 'Track & Trace' }, {
        where: {
          name:  {  [Op.like]: `%trackntrace%` },
        }
      });
      

      await RolePermission.update({ name: 'DigitizedTag' }, {
        where: {
          name: {
            [Op.or]: [
              { [Op.like]: `%digitize%` },
              { [Op.like]: `%deEnableTag%` },
              { [Op.like]: `%duplicate%` },
            ]
          }
        }
      });
      await RolePermission.update({ name: 'Export' }, {
        where: {
          name: {
            [Op.or]: [
              { [Op.like]: `%DiExportChunkNumber%` },
              { [Op.like]: `%TagsExportChunkNumber%` },
              { [Op.like]: `%productExportChunk%` },
            ]
          }
        }
      });
      await RolePermission.update({ name: 'Product' }, {
        where: {
          name:  {  [Op.like]: `%ProductMeta%` },
        }
      });
      await RolePermission.update({ name: 'Track & Trace' }, {
        where: {
          name:  {  [Op.like]: `%trackntrace%` },
        }
      });

      logger.debug("DI permission name updated successfully");
    }
    catch (err) {
      logger.error("Error in updating permissions name for digitized tags", err);
    }
  },

  async down(queryInterface, Sequelize) {
    try {

    }
    catch (err) {

    }
  }
};
