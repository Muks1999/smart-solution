'use strict';
const { NodeNames } = require('../modules/process/common/utils')
const { FeatureAction, Feature, Process } = require('../config/db')
const { v4: uuidv4 } = require('uuid');
const { WorkFlowSchemaService } = require('../modules/process/services/workflow');

import ProcessWorkFlowSchema from "../modules/process/models/processWorkflow";
import { Op, Sequelize } from "sequelize";
module.exports = {
    async up(query, sequelize) {
        let scanMultipleId;
        let scanBarcode;
        let scanMultipleIdId;
        let scanBarcodeId;
        let processType;
        try {
            const data = await Feature.findOne({ where: { name: 'TrackNTrace' } })
            processType = data.dataValues.id;
            const Faction = await FeatureAction.findAll({ where: { featureId: data.dataValues.id } })
            for (let index of Faction) {
                {
                    if (index.name == 'Scan Multiple') {
                        scanMultipleId = 'Scan Multiple';
                        scanMultipleId = index.id;
                    }
                    if (index.name == 'Scan Barcode') {
                        scanBarcode = 'Scan Barcode';
                        scanBarcodeId = index.id;
                    }
                }
            }
        } catch (err) {

        }

        let processUHF = scanMultipleId
        let processASN = scanBarcodeId

        try {
            // deleting old data
            const processes = await Process.findAll({
                where: {
                    name: {
                        [Op.eq]: 'Transfer ASN',
                    }
                },
                logging: true
            });
            let workflowSchemaService = new WorkFlowSchemaService()
            for (const process of processes) {
                await Process.update({
                    states: {

                        [processASN]: {
                            "metadata": {
                                "version": ''
                            },
                            "properties": {
                                'name': 'Scan Barcode',
                                'icon': '',
                                'validation': '',
                                'validationValue': ''
                            }
                        },
                        [processUHF]: {
                            "metadata": {
                                'version': ''
                            },
                            "properties": {
                                'name': 'Scan Multiple',
                                'icon': '',
                                'validation': '',
                                'validationValue': ''
                            }
                        }
                    },
                     transitions: {
                        [processASN]: {
                            "onEnter": {},
                            "on": {
                                "Scan Barcode": {
                                    "condition": "",
                                    "value": "",
                                    "to": processUHF
                                }
                            },
                            "onExit": {}
                        },
                        [processUHF]: {
                            "onEnter": {},
                            "on": {
                                "Scan Multiple": {
                                    "condition": "",
                                    "value": "",
                                    "to": processUHF

                                }
                            },
                            "onExit": {}
                        }
                    },
                    actions: [{ "action": processASN }, { "action": processUHF }],
                    steps: [{ "name": NodeNames.ScanBarcode, "id": processASN, "key": NodeNames.ScanBarcode, "validation": "length12" },
                    { "name": 'Scan Multiple', "id": processUHF, "key": 'Scan Multiple' }],
                }, { where: { id: process.id } });
                let updateProcess = await Process.findOne({ where: { id: process.id } })
                const result = await workflowSchemaService.updateWorkFlow(updateProcess,process.workflowName);
            }
        } catch (err) {
            console.log("Error in updating processTypeName in existing process", err)
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
};

