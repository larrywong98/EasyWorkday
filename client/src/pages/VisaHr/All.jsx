import React from "react";
import { Descriptions, Space } from "antd";
import { useEffect, useState } from "react";
import { List, Select, Input, Button } from "antd";
import loadAllVisaUser from "../../services/loadAllVisaUser";
import { statusProperties, visas, nextSteps } from "../../reducer/global";
import { useSelector } from "react-redux";
import { clearHrSlice, initialHrSlice } from "../../reducer/hrSlice";
import { useDispatch } from "react-redux";
import DownloadForm from "../../components/VisaForms/DownloadForm";
import { Link } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";
const { Search } = Input;

const All = () => {
  const [employees, setEmp] = useState([]);
  const nextStep = useSelector((state) => state.hrReducer.nextStep);
  const [downloads, setDownloads] = useState([]);
  const dispatch = useDispatch();
  const [url, setUrl] = useState("");
  // State to hold the search term
  const [searchTerm, setSearchTerm] = useState("");
  // State to hold the current list of values to display
  const [displayValues, setDisplayValues] = useState([]);

  const findLatestStatus = (visaInfo, fileInfo) => {
    let index = visaInfo.cur;
    let urlindex = Math.min(3 + index, 6);
    // console.log(urlindex);
    // console.log(fileInfo[urlindex][0].url);
    let latestStatus = visaInfo[statusProperties[index]];
    let latestvisaUrl = fileInfo[urlindex][0]?.url || "";
    if (index > 0 && latestStatus === "initial") {
      latestStatus = visaInfo[statusProperties[index - 1]];
      latestvisaUrl = fileInfo[urlindex - 1][0]?.url || "";
      index = index - 1;
    }
    console.log(`all: ${index} ${latestStatus} ${latestvisaUrl}`);
    const message = generateNextStep(latestStatus, index);
    // status, index, url
    dispatch(
      initialHrSlice({
        status: latestStatus,
        url: latestvisaUrl,
        index: index,
        message: message,
      })
    );
  };

  useEffect(() => {
    (async () => {
      const response = await loadAllVisaUser();
      setEmp(response);
      setDisplayValues(response);
      dispatch(clearHrSlice());
      response.forEach((employee) => {
        console.log(employees);
        // console.log(employee.files.slice(3)[0]);
        downloads.push(employee.files.slice(3));
        // setDownloads(...downloads, employee.files.slice(3));
        findLatestStatus(employee.visa, employee.files);
      });
    })();
  }, []);

  const generateNextStep = (latestStatus, index) => {
    let nextstep = "";
    if (index === 4) {
      nextstep = nextSteps[visas[index - 1]][1];
    }
    if (latestStatus === "pending") {
      nextstep = nextSteps[visas[index]][0];
    } else if (latestStatus === "approved") {
      nextstep = nextSteps[visas[index]][1];
    } else if (latestStatus === "rejected") {
      nextstep = nextSteps[visas[index]][0];
    }
    return nextstep;
  };

  const generateOptions = (download) => {
    const result = [];
    download.forEach((dload) =>
      dload.forEach((file) =>
        result.push({ value: file.url, label: file.name })
      )
    );
    return result;
  };
  // generateOptiona(dowloads[index])

  const handleChange = (value) => {
    // console.log(value);
    setUrl(value.value);
  };

  const daysRemain = (visaEndDate) => {
    const date1 = new Date();
    const date2 = new Date(visaEndDate);

    // To calculate the time difference of two dates
    const Difference_In_Time = date2.getTime() - date1.getTime();

    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

    return Difference_In_Days.toFixed(0);
  };

  const onSearch = (value, _e, info) => {
    if (value) {
      const newValues = employees.filter((employee) =>
        employee.info.firstName.toLowerCase().includes(value.toLowerCase())
      );
      if (!newValues) {
        newValues = employees.filter((employee) =>
          employee.info.lastName.toLowerCase().includes(value.toLowerCase())
        );
        if (!newValues) {
          newValues = employees.filter((employee) =>
            employee.info.preferredName
              .toLowerCase()
              .includes(value.toLowerCase())
          );
        }
      }
      setDisplayValues(newValues);
    } else {
      setDisplayValues(employees);
    }
    console.log(info?.source, value);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setDisplayValues(employees);
  };

  return (
    <div style={{ width: "80%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>All:</h1>
        <Link to="/hr/visa">
          <LeftOutlined />
        </Link>
      </div>
      <Search
        placeholder="input search text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        allowClear
        enterButton
        onSearch={onSearch}
      />
      <Button onClick={clearSearch} style={{ margin: "10px 0" }}>
        Clear Search
      </Button>
      <List
        header={<div>Employee</div>}
        bordered
        dataSource={displayValues}
        renderItem={(employee, index) => (
          <>
            <List.Item key={index}>
              <Descriptions title="Employee Info">
                <Descriptions.Item label="Name">
                  {employee.info.firstName} {employee.info.lastName}
                </Descriptions.Item>
                <Descriptions.Item label="Title">
                  {employee.info.visaTitle}
                </Descriptions.Item>
                <Descriptions.Item label="Start and end date">
                  {employee.info.visaDate[0]} {employee.info.visaDate[1]}
                </Descriptions.Item>
                <Descriptions.Item label="Number of Days Remaining">
                  {daysRemain(employee.info.visaDate[1])}
                </Descriptions.Item>
                <Descriptions.Item label="Next Steps" span={2}>
                  {nextStep[index]}
                </Descriptions.Item>
                <Descriptions.Item label="DownLoad Files">
                  {/* {console.log(downloads[index][0])} */}
                  {downloads[index][0].length > 0 ? (
                    <Space align="start">
                      <Select
                        labelInValue
                        defaultValue={{
                          value: "",
                          label: "visa docs",
                        }}
                        style={{
                          width: 120,
                        }}
                        onChange={handleChange}
                        options={generateOptions(downloads[index])}
                      />
                      <DownloadForm url={url} />
                    </Space>
                  ) : (
                    <div>No avaliable files</div>
                  )}
                </Descriptions.Item>
              </Descriptions>
            </List.Item>
          </>
        )}
      />
    </div>
  );
};

export default All;
