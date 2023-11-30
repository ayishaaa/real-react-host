/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import bgImage from "assets/images/bg-profile.jpeg";
// Data
import authorsTableData from "layouts/users/data/authorsTableData";
import MDButton from "components/MDButton";

import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function Users() {
  // const navigate = useNavigate();
  const { columns, rows } = authorsTableData();

  // const handleAddUserClick = () => {
  //   navigate("/layouts/users/addusers");
  // };

  return (
    <DashboardLayout image={bgImage}>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <MDBox
          mx={2}
          mt={-3}
          py={3}
          px={2}
          borderRadius="lg"
          coloredShadow="info"
          style={{ backgroundColor: "#3c4219" }}
        >
          <MDTypography variant="h6" color="white">
            User Management
          </MDTypography>
        </MDBox>
        <MDBox mt={2} mb={7}>
          <Link to="/addusers" style={{ textDecoration: "none" }}>
            {/* <MDBox> */}
            <MDButton
              // variant="gradient"
              // color="info"
              style={{
                // marginLeft: "20px",
                // width: "1340px",
                backgroundColor: "#5d6626",
                color: "white",
              }}
              fullWidth
            >
              Click here to Add Users
            </MDButton>
            {/* </MDBox> */}
          </Link>
        </MDBox>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                borderRadius="lg"
                coloredShadow="info"
                style={{ backgroundColor: "#6e7a31" }}
              >
                <MDTypography variant="h6" color="white">
                  Users List
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
        <br />
      </MDBox>
      {/* <Footer /> */}
    </DashboardLayout>
  );
}

export default Users;
