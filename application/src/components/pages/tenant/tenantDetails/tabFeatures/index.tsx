import { Row, Col, Switch, message, Pagination } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Tabs } from "../../../../../config/constants";
import { getIsPlatformRole, getUserInfo } from "../../../../../redux/features/auth/authSlice";
import { useUpdatetenantMutation } from "../../../../../redux/services/tenantApiSlice";
import { UITable } from "../../../../common/table";
import "./style.css";

export const FeatureList = (props: any) => {
  const { featuresData, refetch, isTenantActive, pagination, setPagination, selectedTab } = props;
  const [selectedRow, setSelectedRow] = useState<any>({});
  const [loading, setLoading] = useState(false)
  const userInfo = useSelector(getUserInfo);
  const loggedInRole = userInfo?.userRole?.roleName;
  const isPlatformRole = parseInt(useSelector(getIsPlatformRole));

  useEffect(()=>{
    if(selectedTab ==Tabs?.Feature){
      setPagination({...pagination, total: 10});
    }
  },[selectedTab]);

  

  let feature = featuresData?.result?.tenantFeatures;
  feature = Array.from(feature).sort((a:any, b:any)=> a?.featureName?.toLowerCase() > b?.featureName?.toLowerCase() ? 1 : -1);

  const onRowClick = (row: any) => {
    setSelectedRow(row);
  };

  const [updateTenant, updateTenantInfo] = useUpdatetenantMutation();

  const onSwitchChange = (ev: any, row: any) => {
    let X = featuresData?.result?.tenantFeatures?.map((el: any) => {
      if (el?.featureId === row?.featureId) {
        return { ...el, isEnabled: ev };
      } else {
        return el;
      }
    });
    var z = { ...featuresData?.result, features: X, updatedBy: userInfo?.id };

    updateTenant(z);
    setSelectedRow(row);
  };
  useEffect(() => {
    if (updateTenantInfo?.isSuccess) {
      refetch();
      if (selectedRow?.isEnabled === true) {
        message.success({
          content: `${selectedRow.featureName} disabled successfully`,
          key: "notificationError",
        });
      } else if (selectedRow?.isEnabled === false) {
        message.success({
          content: `${selectedRow.featureName} enabled successfully`,
          key: "notificationError",
        });
      }
    }
  }, [updateTenantInfo?.isSuccess]);

  const columns = [
    {
      title: "FEATURE",
      dataIndex: "feature",
      sorter: true,
      render: (feature: any, row: any) => {
        return (
          <div onClick={() => onRowClick(row)} className="tableData">
            {row?.featureName}
          </div>
        );
      },
    },
    {
      title: "STATUS",
      dataIndex: "status",
      sorter: true,
      render: (isEnabled: any, row: any) => {
        return (
          <Switch
            disabled={!isTenantActive || isPlatformRole == 0}
            className="featureSwitch"
            key={row?.featureId}
            defaultChecked={row?.isEnabled === true}
            onChange={(ev) => onSwitchChange(ev, row)}
          />
        );
      },
    },
  ];
  return (
    <section className="listing-section">
      <div className="card-body">
        <UITable
          className="featureTable"
          columns={columns}
          data={feature}
          loading={loading}
          // handleTableChange={handleTableChange}
          pagination={pagination}
          setPagination={setPagination}
          scroll={{ x: 1300, y: 500 }}
        />
      </div>
    </section>
  );
};
