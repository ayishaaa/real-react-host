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
import authorsTableData from "layouts/admin/data/authorsTableData";
import MDButton from "components/MDButton";

import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

function Admins() {
  // const navigate = useNavigate();
  const { columns, rows } = authorsTableData();

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
          style={{ display: "flex", backgroundColor: "#3c4219", justifyContent: "space-between" }}
        >
          <MDTypography variant="h6" color="white">
            Admins Management
          </MDTypography>
          <Link to="/addadmins" style={{ textDecoration: "none" }}>
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
            >
              Click here to Add Admins
            </MDButton>
            {/* </MDBox> */}
          </Link>
        </MDBox>
        <MDBox mt={2} mb={7}></MDBox>
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
                  Admins List
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

export default Admins;
