import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Card, Space } from "antd";

const VisaHr = () => {
  return (
    <Card style={{ width: "50%", height: "600px" }}>
      <Space
        direction="vertical"
        size="large"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "10%",
        }}
      >
        <Button
          component={Link}
          to="inprogress"
          variant="contained"
          sx={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            textAlign: "center",
          }}
        >
          In progress Employees
        </Button>
        <Button
          component={Link}
          to="all"
          variant="contained"
          sx={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            textAlign: "center",
          }}
        >
          All Employees
        </Button>
      </Space>
    </Card>
  );
};
export default VisaHr;
