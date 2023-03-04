import { SyncDataAction, SyncDataEntity } from "../modules/device/sync-service/rmq/helpers/rmqConfig";
import { publishEntity } from "../modules/device/sync-service/services/sync";
import mongoSequelizeMeta from "../modules/process/models/mongosSequelizeMeta";
import PreDefinedStateMachine from "../modules/process/models/predefinedStatemachine";
import { logger } from '../libs/logger'



const scanMultipleSM = [
    new PreDefinedStateMachine({
        tenantId:'SMARTCOMOS',
        isShared:true,
        name: 'Scan Multiple',
        initialState: {
            name: 'Start',
            transitions: [
                { from: 'Start', event: ['start'], to: 'Scan Multiple', gaurd: {} }
            ],
            output: null
        },
        finalState: {
            name: 'End',
            transitions: [
            ],
            output: null
        },
        states: [{
            name: 'Start',
            transitions: [
                { from: 'Start', event: ['scan'], to: 'Scan Multiple', gaurd: {} },
                { from: 'Start', event: ['end'], to: 'End', gaurd: {} }

            ],
            output: null
        },
        {
            name: 'Scan Multiple',
            transitions: [
                { from: 'Scan Multiple', event: ['scan'], to: 'Scan Multiple', gaurd: {} },
                { from: 'Scan Multiple', event: ['discard'], to: 'End', gaurd: {} },
                { from: 'Scan Multiple', event: ['submit'], to: 'End', gaurd: {} },
                { from: 'Scan Multiple', event: ['pause'], to: 'Scan Multiple', gaurd: {} },
                { from: 'Scan Multiple', event: ['resume'], to: 'Scan Multiple', gaurd: {} },

            ],
            output: null
        },
        {
            name: 'End',
            transitions: [
            ],
            output: null
        }
        ],
        transitions: [
            { from: 'Start', event: ['start'], to: 'Scan Multiple', gaurd: {} },
            { from: 'Scan Multiple', event: ['scan'], to: 'Scan Multiple', gaurd: {} },
            { from: 'Scan Multiple', event: ['discard'], to: 'End', gaurd: {} },
            { from: 'Scan Multiple', event: ['submit'], to: 'End', gaurd: {} },
            { from: 'Scan Multiple', event: ['pause'], to: 'Scan Multiple', gaurd: {} },
            { from: 'Scan Multiple', event: ['resume'], to: 'Scan Multiple', gaurd: {} },
        ]
    }
)]

let done = 0;

export const seedScanMultipleSM = async () => {
    try {
        let data = await mongoSequelizeMeta.find({ name: '20230201061022-scanMultipleSM.js' });
         if (data.length <= 0) {
            for (let i = 0; i < scanMultipleSM.length; i++) {
               let response= await PreDefinedStateMachine.find({name:scanMultipleSM[i].name});
               if(response.length>0)
               { 
                const scan = await PreDefinedStateMachine.deleteMany({name:scanMultipleSM[i].name});
               }
               scanMultipleSM[i].save(function (err, result) {
                    done++;
                    if(result){
                        const data = {
                            type: 'config',
                            entity:SyncDataEntity.STATEMACHINE,
                            action:SyncDataAction.CREATE,
                            params:{},
                            tenantId:'SMARTCOMOS',
                            data: result
                        }
                        publishEntity(data)
                    }
                });
            }
            // inserting the migration into mongos seqalize
            await mongoSequelizeMeta.create({ name: '20230201061022-scanMultipleSM.js' });
        }

    } catch (err) {
        logger.error("error in scanMultipleSM seeder", err)
    }
    
}