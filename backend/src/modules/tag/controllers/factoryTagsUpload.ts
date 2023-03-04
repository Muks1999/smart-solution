import { Request, Response } from "express";
import { respHndlr } from "../../../middlewares/resp-handler";
import { TagService } from "../services/tags";
import { FACTORY_TAG_HEADER } from "../utils/constant";
import { uploadXLSX } from '../../../libs/fileUploader';
import * as fs from 'fs';
import xlsx from 'node-xlsx';
import StatusCodes from "http-status-codes";
import { findDuplicates } from "../../../helpers";
const tagServiceInstance = new TagService()
import { logger } from '../../../libs/logger';


export class FactoryUploadTagController {
    
    
  async upload(req: Request, res: Response) 
  {
   

      const uploadSingleXLSX = uploadXLSX.single("file");
     
      uploadSingleXLSX(req, res, async function (err) {
        try {
          if (err) {
            // throw multer file validation errors
            throw err.message;
          }
         
         
          if (req.file !== undefined) {
            const { filename, path } = req.file;
           
            const workSheetsFromBuffer = xlsx.parse(fs.readFileSync(path));
            const xlsxData = workSheetsFromBuffer[0].data;
            // Make json data from excel file data
            const headers:any = xlsxData[0];
            if(headers[0]!==FACTORY_TAG_HEADER.MANUFACTURERNAME 
              || headers[1]!==FACTORY_TAG_HEADER.CUSTOMERNAME
              || headers[2]!==FACTORY_TAG_HEADER.BATCHID
              || headers[3]!==FACTORY_TAG_HEADER.TAGID
              || headers[4]!==FACTORY_TAG_HEADER.TAGINFO
              || headers[5]!==FACTORY_TAG_HEADER.TAGTYPE
              || headers[6]!==FACTORY_TAG_HEADER.TAGCLASS
              || headers[7]!==FACTORY_TAG_HEADER.HASH
              || headers[8]!==FACTORY_TAG_HEADER.SECUREKEY
              || headers[9]!==FACTORY_TAG_HEADER.INLAYITEMNAME
              || headers[10]!==FACTORY_TAG_HEADER.INLAYTYPE
              || headers[11]!==FACTORY_TAG_HEADER.VENDORNAME
              || headers[12]!==FACTORY_TAG_HEADER.ORDERID
              || headers[13]!==FACTORY_TAG_HEADER.ORDERDATE
              || headers[14]!==FACTORY_TAG_HEADER.ORDERQUANTITY
              || headers[15]!==FACTORY_TAG_HEADER.ORDERQUANTITYUNIT
              || headers[16]!==FACTORY_TAG_HEADER.DELIVERYDATE
              || headers[17]!==FACTORY_TAG_HEADER.DELIVERYITEMNAME
              || headers[18]!==FACTORY_TAG_HEADER.DELIVERYQUANTITY
              || headers[19]!==FACTORY_TAG_HEADER.DELIVERYQUANTITYUNIT
              )
              {
                throw  'Upload failed ,Invalid template';
              }
            const rows = xlsxData.filter((item, index) => index !== 0);
            const productJSON:any = [];
            rows.forEach((row:any) => {
              let merged = headers.reduce((obj:any, key:any, index:any) => ({ ...obj, [key]: row[index] }), {});
              productJSON.push(merged);
            });
            // uploading data into S3  
           let uploadedFileS3Link=await tagServiceInstance.uploadFiletoS3(req);
           logger.info("After uploading file into s3")
           //let uploadedFileS3Link='file-uploading-url-in-s3-facing-error';
           req.body.S3fileLink = uploadedFileS3Link;
          // save excel data into database
            req.body.filename=filename;
           const result:any = await tagServiceInstance.bulkUploadTags(req, productJSON);
          
            // uploading data into S4  
           // let uploadedFile=await tagServiceInstance.uploadFiletoS3(req);
            respHndlr.sendSuccess(res, result, StatusCodes.OK);
          } else {
            throw "XLSX file is required.";
          }
  
        } catch (error) {
          
          respHndlr.sendError(res, error);
        }
      });
  }

    
}