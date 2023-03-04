export const tagNotFound = 'no tag found with tagId '
export const tagAlreadyExist = 'tag already exist with tagId '
export const tagDeleted = 'tag deleted successfully with tagId '
export const BatchNotFound = 'batch details not found '
export const DeviceNotFound = 'device details not found '
export const processAlreadyRunningInZone = 'someone already running the process in this zone '
export const processStateNotFount = 'no process currently running in this zone '

export enum tenantEndpoints{
    TENANTBYID = 'tenant',
    SYNC_PRODUCT = 'device/product',
    USER = 'user/'
}

export const DEVICE_DETAILS='device/' 
export const FEATURES_NAME_BY_ID='feature/' 
export const tagUploadSuccessfully='Tags uploaded sucessfully'
export const FEATURES_NAME_NOT_FOUND='Process Type not found'
export const DIGITIZATION='Digitization';
export const TRACKNTRACE='TrackNTrace';
export const PROCESS_NAME_BY_ID='process/'
export const FullCount = 'Full Count'
export const Product = 'product/'
export const Site = 'site/'
export const Zone = 'zone/'
export const ZoneType = 'zoneType/'
export const TagReport = '/report/tag'
export const EnablementReport = '/report/enablement'
export const TransferASN = 'Transfer ASN'
export const RecievedASN = 'Recieved ASN'
export const RecievedBlind = 'Recieved Blind'
export const BulkInsertLimit=500
export const markerCodeMaxCount = 6;
export const addInputMaxCount = 6;
export const encodeMaxCount = 6;
export const NFC='NFC';
export const nfc='nfc';
export const CHUNKSIZEUPLOAD=500;
export const FACTORY_TAG_HEADER =
{
    MANUFACTURERNAME:'manufacturerName',
    CUSTOMERNAME:'customerName',
    BATCHID:'batchId',
    TAGID:'tagId',
    TAGINFO:'tagInfo',
    TAGTYPE:'tagType',
    TAGCLASS:'tagClass',
    HASH:'hash',
    SECUREKEY:'secureKey',
    INLAYITEMNAME:'inlayItemName',
    INLAYTYPE:'inlayType',
    VENDORNAME:'vendorName',
    ORDERID:'orderId',
    ORDERDATE:'orderDate',
    ORDERQUANTITY:'orderQuantity',
    ORDERQUANTITYUNIT:'orderQuantityUnit',
    DELIVERYDATE:'deliveryDate',
    DELIVERYITEMNAME:'deliveryItemName',
    DELIVERYQUANTITY:'deliveryQuantity',
    DELIVERYQUANTITYUNIT:'deliveryQuantityUnit'
}
