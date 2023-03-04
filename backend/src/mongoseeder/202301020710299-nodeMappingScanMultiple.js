import { NodeNames } from "../modules/process/common/utils";
import mongoSequelizeMeta from "../modules/process/models/mongosSequelizeMeta";
import NodesMapping from "../modules/process/models/nodeMapping";
import { logger } from '../libs/logger'


const nodesmapping = [ 
    {
        nodeName:NodeNames.ScanMultiple,
        isStateMachine:true,
        isWorkflow:false,
        stateMachineName:NodeNames.ScanMultiple,
        workflowName:null,   
    }
    ]
let done = 0;

export const seedNodeMappingScanMultiple = async () => {
    try {
        let data = await mongoSequelizeMeta.find({ name: '202301020710299-nodeMappingScanMultiple.js' });
        if (data.length <= 0) {
            for (const nodemap of nodesmapping) {
                let response= await NodesMapping.find({nodeName:nodemap.nodeName});
                if(response.length>0)
                { 
                    await NodesMapping.deleteMany({nodeName:nodemap.nodeName});
                }
                await NodesMapping.create(nodemap);
            }
            // inserting the migration into mongos seqalize
            await mongoSequelizeMeta.create({ name: '202301020710299-nodeMappingScanMultiple.js' });
        }

    } catch (err) {
        logger.error("error in nodeMappingScanMultiple seeder",err)
    }
}